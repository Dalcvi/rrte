import { mergeAttributes, Node, textblockTypeInputRule } from '@tiptap/core';
import classes from './heading.module.scss';

export type Level = 1 | 2 | 3 | 4 | 5 | 6;
export const name = 'heading';

export interface HeadingOptions {
  levels: Level[];
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    heading: {
      /**
       * Set a heading node
       */
      setHeading: (attributes: { level: Level }) => ReturnType;
      /**
       * Toggle a heading node
       */
      toggleHeading: (attributes: { level: Level }) => ReturnType;
    };
  }
}

export const HeadingNode = Node.create<HeadingOptions>({
  name: 'heading',

  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: { class: classes.heading },
    };
  },

  content: 'inline*',

  group: 'block',

  defining: true,

  addAttributes() {
    return {
      level: {
        default: 1,
      },
    };
  },

  parseHTML() {
    return this.options.levels.map((level: Level) => ({
      tag: `h${level}`,
      attrs: { level },
    }));
  },

  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level = hasLevel ? node.attrs.level : this.options.levels[0];

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-testid': `heading-${level}`,
      }),
      0,
    ];
  },

  speechCommands: t => [
    {
      group: t('voice-group.document-formatting'),
      activationKeyword: t('voice-command.set-heading-one'),
      command: 'setHeading',
      params: [{ level: 1 }],
      description: 'Set a heading',
    },
    {
      group: t('voice-group.document-formatting'),
      activationKeyword: t('voice-command.set-heading-two'),
      command: 'setHeading',
      params: [{ level: 2 }],
      description: 'Set a heading',
    },
    {
      group: t('voice-group.document-formatting'),
      activationKeyword: t('voice-command.set-heading-three'),
      command: 'setHeading',
      params: [{ level: 3 }],
      description: 'Set a heading',
    },
    {
      group: t('voice-group.document-formatting'),
      activationKeyword: t('voice-command.set-heading-four'),
      command: 'setHeading',
      params: [{ level: 4 }],
      description: 'Set a heading',
    },
    {
      group: t('voice-group.document-formatting'),
      activationKeyword: t('voice-command.set-heading-five'),
      command: 'setHeading',
      params: [{ level: 5 }],
      description: 'Set a heading',
    },
    {
      group: t('voice-group.document-formatting'),
      activationKeyword: t('voice-command.set-heading-six'),
      command: 'setHeading',
      params: [{ level: 6 }],
      description: 'Set a heading',
    },
  ],

  addCommands() {
    return {
      setHeading:
        attributes =>
        ({ commands }) => {
          if (!this.options.levels.includes(attributes.level)) {
            return false;
          }

          return commands.setNode(this.name, attributes);
        },
      toggleHeading:
        attributes =>
        ({ commands }) => {
          if (!this.options.levels.includes(attributes.level)) {
            return false;
          }

          return commands.toggleNode(this.name, 'paragraph', attributes);
        },
    };
  },

  addKeyboardShortcuts() {
    return this.options.levels.reduce(
      (items, level) => ({
        ...items,
        ...{
          [`Mod-Alt-${level}`]: () => this.editor.commands.toggleHeading({ level }),
        },
      }),
      {}
    );
  },

  addInputRules() {
    return this.options.levels.map(level => {
      return textblockTypeInputRule({
        find: new RegExp(`^(#{1,${level}})\\s$`),
        type: this.type,
        getAttributes: {
          level,
        },
      });
    });
  },
});
