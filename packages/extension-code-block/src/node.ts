import { mergeAttributes, Node, textblockTypeInputRule } from '@tiptap/core';
import { Plugin, PluginKey, TextSelection } from '@tiptap/pm/state';
import classes from './code-block.module.scss';

export interface CodeBlockOptions {
  /**
   * Should the node be exited on triple enter.
   * Defaults to `true`.
   */
  exitOnTripleEnter: boolean;
  /**
   * Should the node be exited on arrow down.
   * Defaults to `true`.
   */
  exitOnArrowDown: boolean;
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    codeBlock: {
      /**
       * Set a code block
       */
      setCodeBlock: (attributes?: { language: string }) => ReturnType;
      /**
       * Toggle a code block
       */
      toggleCodeBlock: (attributes?: { language: string }) => ReturnType;
    };
  }
}

export const backtickInputRegex = /^```([a-z]+)?[\s\n]$/;

export const CodeBlockNode = Node.create<CodeBlockOptions>({
  name: 'codeBlock',

  addOptions() {
    return {
      exitOnTripleEnter: true,
      exitOnArrowDown: true,
      HTMLAttributes: {
        class: classes.base,
      },
    };
  },

  content: 'text*',

  marks: '',

  group: 'block',

  code: true,

  defining: true,

  parseHTML() {
    return [
      {
        tag: 'pre',
        preserveWhitespace: 'full',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'pre',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-testid': 'codeBlock',
      }),
      ['code', {}, 0],
    ];
  },

  addCommands() {
    return {
      setCodeBlock:
        (attributes) =>
        ({ commands }) => {
          return commands.setNode(this.name, attributes);
        },
      toggleCodeBlock:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleNode(this.name, 'paragraph', attributes);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Alt-c': () => this.editor.commands.toggleCodeBlock(),

      Backspace: () => {
        const { empty, $anchor } = this.editor.state.selection;
        const isAtStart = $anchor.pos === 1;

        if (!empty || $anchor.parent.type.name !== this.name) {
          return false;
        }

        if (isAtStart || !$anchor.parent.textContent.length) {
          return this.editor.commands.clearNodes();
        }

        return false;
      },

      Enter: ({ editor }) => {
        if (!this.options.exitOnTripleEnter) {
          return false;
        }

        const { state } = editor;
        const { selection } = state;
        const { $from, empty } = selection;

        if (!empty || $from.parent.type !== this.type) {
          return false;
        }

        const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;
        const alreadyTwoEndlines = $from.parent.textContent.endsWith('\n\n');

        if (!isAtEnd || !alreadyTwoEndlines) {
          return false;
        }

        return editor
          .chain()
          .command(({ tr }) => {
            tr.delete($from.pos - 2, $from.pos);

            return true;
          })
          .exitCode()
          .run();
      },

      ArrowDown: ({ editor }) => {
        if (!this.options.exitOnArrowDown) {
          return false;
        }

        const { state } = editor;
        const { selection, doc } = state;
        const { $from, empty } = selection;

        if (!empty || $from.parent.type !== this.type) {
          return false;
        }

        const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;
        const after = $from.after();
        const cantExit = !isAtEnd || after === undefined;

        if (!cantExit) {
          return false;
        }

        if (doc.nodeAt(after)) {
          return false;
        }

        return editor.commands.exitCode();
      },
    };
  },

  addInputRules() {
    return [
      textblockTypeInputRule({
        find: backtickInputRegex,
        type: this.type,
        getAttributes: (match) => ({
          language: match[1],
        }),
      }),
    ];
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('codeBlockVSCodeHandler'),
        props: {
          handlePaste: (view, event) => {
            if (!event.clipboardData) {
              return false;
            }

            if (this.editor.isActive(this.type.name)) {
              return false;
            }

            const text = event.clipboardData.getData('text/plain');
            const vscode = event.clipboardData.getData('vscode-editor-data');
            const vscodeData = vscode ? JSON.parse(vscode) : undefined;
            const language = vscodeData?.mode;

            if (!text || !language) {
              return false;
            }

            const { tr } = view.state;

            tr.replaceSelectionWith(this.type.create({ language }));

            tr.setSelection(TextSelection.near(tr.doc.resolve(Math.max(0, tr.selection.from - 2))));

            tr.insertText(text.replace(/\r\n?/g, '\n'));

            tr.setMeta('paste', true);

            view.dispatch(tr);

            return true;
          },
        },
      }),
    ];
  },
});
