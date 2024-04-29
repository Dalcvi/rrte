import { Mark, markInputRule, markPasteRule, mergeAttributes } from '@tiptap/core';

export type StrikeOptions = {
  HTMLAttributes: Record<string, any>;
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    strike: {
      /**
       * Set the the selection as strike
       */
      setStrike: () => ReturnType;
      /**
       * Toggle the strike
       */
      toggleStrike: () => ReturnType;
      /**
       * Unset the strike
       */
      unsetStrike: () => ReturnType;
    };
  }
}

const regex = /~~(.*?)~~/g;

export const StrikeMark = Mark.create<StrikeOptions>({
  name: 'strike',

  group: 'inline',

  parseHTML() {
    return [
      {
        tag: 's',
      },
      {
        tag: 'del',
      },
      {
        style: 'text-decoration',
        getAttrs: value => {
          if (typeof value === 'string' && value.includes('line-through')) {
            return {
              textDecoration: 'line-through',
            };
          }
          return false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['del', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  speechCommands: t => [
    {
      activationKeyword: t('voice-command.toggle-strike'),
      group: t('voice-group.text-formatting'),
      command: 'toggleStrike',
      description: 'Toggle strike',
    },
  ],

  addCommands() {
    return {
      setStrike:
        () =>
        ({ commands }) => {
          return commands.setMark('strike');
        },
      toggleStrike:
        () =>
        ({ commands, editor }) => {
          const isActive = editor.isActive('strike');
          if (isActive) {
            return commands.unsetStrike();
          }

          return commands.setStrike();
        },
      unsetStrike:
        () =>
        ({ commands }) => {
          return commands.unsetMark('strike');
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-s': () => this.editor.commands.toggleStrike(),
      'Mod-S': () => this.editor.commands.toggleStrike(),
    };
  },

  addInputRules() {
    return [
      markInputRule({
        find: regex,
        type: this.type,
      }),
    ];
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: regex,
        type: this.type,
      }),
    ];
  },
});
