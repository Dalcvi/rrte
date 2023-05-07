import { Mark, mergeAttributes } from '@tiptap/core';

export type UnderlineOptions = {
  HTMLAttributes: Record<string, any>;
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    underline: {
      /**
       * Set the the selection as underline
       */
      setUnderline: () => ReturnType;
      /**
       * Toggle the underline
       */
      toggleUnderline: (isActive: boolean) => ReturnType;
      /**
       * Unset the underline
       */
      unsetUnderline: () => ReturnType;
    };
  }
}

export const UnderlineMark = Mark.create<UnderlineOptions>({
  name: 'underline',

  group: 'inline',

  parseHTML() {
    return [
      {
        tag: 'u',
      },
      {
        style: 'text-decoration',
        getAttrs: (value) => {
          if (typeof value === 'string' && value.includes('underline')) {
            return {
              verticalAlign: 'underline',
            };
          }
          return false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['u', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setUnderline:
        () =>
        ({ commands }) => {
          return commands.setMark('underline');
        },
      toggleUnderline:
        (isActive: boolean) =>
        ({ commands }) => {
          if (isActive) {
            return commands.unsetUnderline();
          }

          return commands.setUnderline();
        },
      unsetUnderline:
        () =>
        ({ commands }) => {
          return commands.unsetMark('underline');
        },
    };
  },
});
