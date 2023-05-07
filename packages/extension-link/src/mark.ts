import {
  Mark,
  markPasteRule,
  mergeAttributes,
  getAttributes,
  combineTransactionSteps,
  findChildrenInRange,
  getChangedRanges,
  getMarksBetween,
  NodeWithPos,
  getMarkType,
  getMarkRange,
  isMarkActive,
  isTextSelection,
} from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { find, registerCustomProtocol, reset, test } from 'linkifyjs';
import classes from './link.module.scss';

export interface LinkProtocolOptions {
  scheme: string;
  optionalSlashes?: boolean;
}

export interface LinkOptions {
  /**
   * If enabled, it adds links as you type.
   */
  autolink: boolean;
  /**
   * An array of custom protocols to be registered with linkifyjs.
   */
  protocols: Array<LinkProtocolOptions | string>;
  /**
   * If enabled, links will be opened on click.
   */
  openOnClick: boolean;
  /**
   * Adds a link to the current selection if the pasted content only contains an url.
   */
  linkOnPaste: boolean;
  /**
   * A list of HTML attributes to be rendered.
   */
  HTMLAttributes: Record<string, any>;
  /**
   * A validation function that modifies link verification for the auto linker.
   * @param url - The url to be validated.
   * @returns - True if the url is valid, false otherwise.
   */
  validate?: (url: string) => boolean;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    link: {
      /**
       * Set a link mark
       */
      setLink: (attributes: { href: string; target?: string | null }) => ReturnType;
      /**
       * Toggle a link mark
       */
      toggleLink: (attributes: { href: string; target?: string | null }) => ReturnType;
      /**
       * Unset a link mark
       */
      unsetLink: () => ReturnType;
    };
  }
}

export const LinkMark = Mark.create<LinkOptions>({
  name: 'link',

  priority: 1000,

  keepOnSplit: false,

  allowGapCursor: true,

  exitable: true,

  onCreate() {
    this.options.protocols.forEach((protocol) => {
      if (typeof protocol === 'string') {
        registerCustomProtocol(protocol);
        return;
      }
      registerCustomProtocol(protocol.scheme, protocol.optionalSlashes);
    });
  },

  onDestroy() {
    reset();
  },

  inclusive() {
    return this.options.autolink;
  },

  addOptions() {
    return {
      openOnClick: true,
      linkOnPaste: true,
      autolink: true,
      protocols: [],
      HTMLAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer nofollow',
        class: classes.base,
      },
      validate: undefined,
    };
  },

  addAttributes() {
    return {
      href: {
        default: null,
      },
      target: {
        default: this.options.HTMLAttributes.target,
      },
    };
  },

  parseHTML() {
    return [{ tag: 'a[href]:not([href *= "javascript:" i])' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['a', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setLink:
        (attributes) =>
        ({ chain }) => {
          return chain()
            .setMark(this.name, attributes)
            .setMeta('preventAutolink', true)
            .command(({ tr, state }) => {
              const { selection } = tr;
              const type = getMarkType(this.name, state.schema);
              const { empty } = selection;
              const newMarkType = type.create(attributes);
              const cursor = isTextSelection(selection) ? selection.$cursor : null;
              if (cursor) {
                const currentMarks = state.storedMarks ?? cursor.marks();

                if (
                  (empty && !!newMarkType.isInSet(currentMarks)) ||
                  !currentMarks.some((mark) => mark.type.excludes(type))
                ) {
                  tr.setStoredMarks([type.create(attributes)]);
                }
              }
              return true;
            })
            .run();
        },

      toggleLink:
        (attributes) =>
        ({ chain, commands, state }) => {
          const isActive = isMarkActive(state, this.type, attributes);
          if (isActive) {
            return commands.unsetLink();
          }
          return commands.setLink(attributes);
        },

      unsetLink:
        () =>
        ({ chain }) => {
          return chain()
            .unsetMark(this.name, { extendEmptyMarkRange: true })
            .setMeta('preventAutolink', true)
            .command(({ tr, state }) => {
              const { selection } = tr;
              const type = getMarkType(this.name, state.schema);
              const { empty } = selection;
              if (empty) {
                tr.removeStoredMark(type);
              }
              return true;
            })
            .run();
        },
    };
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: (text) =>
          find(text)
            .filter((link) => {
              if (this.options.validate) {
                return this.options.validate(link.value);
              }

              return true;
            })
            .filter((link) => link.isLink)
            .map((link) => ({
              text: link.value,
              index: link.start,
              data: link,
            })),
        type: this.type,
        getAttributes: (match) => ({
          href: match.data?.href,
        }),
      }),
    ];
  },

  addProseMirrorPlugins() {
    return [
      this.options.autolink
        ? new Plugin({
            key: new PluginKey('autolink'),
            appendTransaction: (transactions, oldState, newState) => {
              const docChanges =
                transactions.some((transaction) => transaction.docChanged) && !oldState.doc.eq(newState.doc);
              const preventAutolink = transactions.some((transaction) => transaction.getMeta('preventAutolink'));

              if (!docChanges || preventAutolink) {
                return;
              }

              const { tr } = newState;
              const transform = combineTransactionSteps(oldState.doc, [...transactions]);
              const { mapping } = transform;
              const changes = getChangedRanges(transform);

              changes.forEach(({ oldRange, newRange }) => {
                getMarksBetween(oldRange.from, oldRange.to, oldState.doc)
                  .filter((item) => item.mark.type === this.type)
                  .forEach((oldMark) => {
                    const newFrom = mapping.map(oldMark.from);
                    const newTo = mapping.map(oldMark.to);
                    const newMarks = getMarksBetween(newFrom, newTo, newState.doc).filter(
                      (item) => item.mark.type === this.type,
                    );

                    if (!newMarks.length) {
                      return;
                    }

                    const newMark = newMarks[0];
                    const oldLinkText = oldState.doc.textBetween(oldMark.from, oldMark.to, undefined, ' ');
                    const newLinkText = newState.doc.textBetween(newMark.from, newMark.to, undefined, ' ');
                    const wasLink = test(oldLinkText);
                    const isLink = test(newLinkText);

                    if (wasLink && !isLink) {
                      tr.removeMark(newMark.from, newMark.to, this.type);
                    }
                  });

                const nodesInChangedRanges = findChildrenInRange(newState.doc, newRange, (node) => node.isTextblock);

                let textBlock: NodeWithPos | undefined;
                let textBeforeWhitespace: string | undefined;

                if (nodesInChangedRanges.length > 1) {
                  textBlock = nodesInChangedRanges[0];
                  textBeforeWhitespace = newState.doc.textBetween(
                    textBlock.pos,
                    textBlock.pos + textBlock.node.nodeSize,
                    undefined,
                    ' ',
                  );
                } else if (
                  nodesInChangedRanges.length &&
                  newState.doc.textBetween(newRange.from, newRange.to, ' ', ' ').endsWith(' ')
                ) {
                  textBlock = nodesInChangedRanges[0];
                  textBeforeWhitespace = newState.doc.textBetween(textBlock.pos, newRange.to, undefined, ' ');
                }

                if (textBlock && textBeforeWhitespace) {
                  const wordsBeforeWhitespace = textBeforeWhitespace.split(' ').filter((s) => s !== '');

                  if (wordsBeforeWhitespace.length <= 0) {
                    return false;
                  }

                  const lastWordBeforeSpace = wordsBeforeWhitespace[wordsBeforeWhitespace.length - 1];
                  const lastWordAndBlockOffset = textBlock.pos + textBeforeWhitespace.lastIndexOf(lastWordBeforeSpace);

                  if (!lastWordBeforeSpace) {
                    return false;
                  }

                  find(lastWordBeforeSpace)
                    .filter((link) => link.isLink)
                    .filter((link) => {
                      if (this.options.validate) {
                        return this.options.validate(link.value);
                      }
                      return true;
                    })
                    .map((link) => ({
                      ...link,
                      from: lastWordAndBlockOffset + link.start + 1,
                      to: lastWordAndBlockOffset + link.end + 1,
                    }))
                    .forEach((link) => {
                      tr.addMark(
                        link.from,
                        link.to,
                        this.type.create({
                          href: link.href,
                        }),
                      );
                    });
                }
              });

              if (!tr.steps.length) {
                return;
              }

              return tr;
            },
          })
        : undefined,

      this.options.openOnClick && !this.editor.isEditable
        ? new Plugin({
            key: new PluginKey('handleClickLink'),
            props: {
              handleClick: (view, pos, event) => {
                if (event.button !== 0) {
                  return false;
                }

                const attrs = getAttributes(view.state, this.type.name);
                const link = (event.target as HTMLElement)?.closest('a');

                const href = link?.href ?? attrs.href;
                const target = link?.target ?? attrs.target;

                if (link && href) {
                  window.open(href, target);

                  return true;
                }

                return false;
              },
            },
          })
        : undefined,

      this.options.linkOnPaste
        ? new Plugin({
            key: new PluginKey('handlePasteLink'),
            props: {
              handlePaste: (view, event, slice) => {
                const { state } = view;
                const { selection } = state;
                const { empty } = selection;

                if (empty) {
                  return false;
                }

                let textContent = '';

                slice.content.forEach((node) => {
                  textContent += node.textContent;
                });

                const link = find(textContent).find((item) => item.isLink && item.value === textContent);

                if (!textContent || !link) {
                  return false;
                }

                this.editor.commands.setMark(this.type, {
                  href: link.href,
                });

                return true;
              },
            },
          })
        : undefined,
    ].filter(Boolean) as Plugin[];
  },
});
