import { Mark, markInputRule, markPasteRule, mergeAttributes } from '@tiptap/core';

export type ItalicOptions = {
  HTMLAttributes: Record<string, any>;
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    italic: {
      /**
       * Set the the selection as italic
       */
      setItalic: () => ReturnType;
      /**
       * Toggle the italic
       */
      toggleItalic: () => ReturnType;
      /**
       * Unset the italic
       */
      unsetItalic: () => ReturnType;
    };
  }
}

const regex = /(\*|_)(.*?)\1/g;

export const ItalicMark = Mark.create<ItalicOptions>({
  name: 'italic',

  group: 'inline',

  parseHTML() {
    return [
      {
        tag: 'em',
      },
      {
        tag: 'i',
      },
      {
        style: 'font-style',
        getAttrs: value => {
          if (typeof value === 'string' && /^(italic|oblique)$/.test(value)) {
            return {
              fontStyle: 'italic',
            };
          }
          return false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['em', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setItalic:
        () =>
        ({ commands }) => {
          return commands.setMark('italic');
        },
      toggleItalic:
        () =>
        ({ commands, editor }) => {
          const isActive = editor.isActive('italic');
          if (isActive) {
            return commands.unsetItalic();
          }

          return commands.setItalic();
        },
      unsetItalic:
        () =>
        ({ commands }) => {
          return commands.unsetMark('italic');
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-i': () => this.editor.commands.toggleItalic(),
      'Mod-I': () => this.editor.commands.toggleItalic(),
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
