import { Mark, markInputRule, markPasteRule, mergeAttributes } from '@tiptap/core';

export type SuperscriptOptions = {
  HTMLAttributes: Record<string, any>;
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    superscript: {
      /**
       * Set the the selection as superscript
       */
      setSuperscript: () => ReturnType;
      /**
       * Toggle the superscript
       */
      toggleSuperscript: () => ReturnType;
      /**
       * Unset the superscript
       */
      unsetSuperscript: () => ReturnType;
    };
  }
}

const regex = /(?<!\^)\^(.*?)\^(?!\^)/g;

export const SuperscriptMark = Mark.create<SuperscriptOptions>({
  name: 'superscript',

  group: 'inline',

  parseHTML() {
    return [
      {
        tag: 'sup',
      },
      {
        style: 'vertical-align',
        getAttrs: value => {
          if (typeof value === 'string' && value.includes('super')) {
            return {
              verticalAlign: 'super',
            };
          }
          return false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['sup', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setSuperscript:
        () =>
        ({ commands, editor }) => {
          if (editor.extensionManager.extensions.some(val => val.name === 'subscript')) {
            commands.unsetMark('subscript');
          }
          return commands.setMark('superscript');
        },
      toggleSuperscript:
        () =>
        ({ commands, editor }) => {
          const isActive = editor.isActive('superscript');
          if (isActive) {
            return commands.unsetSuperscript();
          }

          return commands.setSuperscript();
        },
      unsetSuperscript:
        () =>
        ({ commands }) => {
          return commands.unsetMark('superscript');
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-shift-u': () => this.editor.commands.toggleSuperscript(),
      'Mod-shift-U': () => this.editor.commands.toggleSuperscript(),
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
