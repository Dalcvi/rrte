import { Mark, markInputRule, markPasteRule, mergeAttributes } from '@tiptap/core';

export type SubscriptOptions = {
  HTMLAttributes: Record<string, any>;
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    subscript: {
      /**
       * Set the the selection as subscript
       */
      setSubscript: () => ReturnType;
      /**
       * Toggle the subscript
       */
      toggleSubscript: () => ReturnType;
      /**
       * Unset the subscript
       */
      unsetSubscript: () => ReturnType;
    };
  }
}

const regex = /(?<!~)~(.*?)~(?!~)/g;

export const SubscriptMark = Mark.create<SubscriptOptions>({
  name: 'subscript',

  group: 'inline',

  parseHTML() {
    return [
      {
        tag: 'sub',
      },
      {
        style: 'vertical-align',
        getAttrs: value => {
          if (typeof value === 'string' && value.includes('sub')) {
            return {
              verticalAlign: 'sub',
            };
          }
          return false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['sub', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  speechCommands: t => [
    {
      activationKeyword: t('voice-command.toggle-subscript'),
      group: t('voice-group.text-formatting'),
      command: 'toggleSubscript',
      description: 'Toggle subscript',
    },
  ],

  addCommands() {
    return {
      setSubscript:
        () =>
        ({ commands, editor }) => {
          if (editor.extensionManager.extensions.some(val => val.name === 'superscript')) {
            commands.unsetMark('superscript');
          }
          return commands.setMark('subscript');
        },
      toggleSubscript:
        () =>
        ({ commands, editor }) => {
          const isActive = editor.isActive('subscript');
          if (isActive) {
            return commands.unsetSubscript();
          }

          return commands.setSubscript();
        },
      unsetSubscript:
        () =>
        ({ commands }) => {
          return commands.unsetMark('subscript');
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-shift-d': () => this.editor.commands.toggleSubscript(),
      'Mod-shift-D': () => this.editor.commands.toggleSubscript(),
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
