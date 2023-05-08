import { Mark, mergeAttributes } from '@tiptap/core';

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
      toggleItalic: (isActive: boolean) => ReturnType;
      /**
       * Unset the italic
       */
      unsetItalic: () => ReturnType;
    };
  }
}

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
        getAttrs: (value) => {
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
        (isActive: boolean) =>
        ({ commands }) => {
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
});
