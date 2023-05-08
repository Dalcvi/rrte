import { Mark, mergeAttributes } from '@tiptap/core';

export type BoldOptions = {
  HTMLAttributes: Record<string, any>;
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    bold: {
      /**
       * Set the the selection as bold
       */
      setBold: () => ReturnType;
      /**
       * Toggle the bold
       */
      toggleBold: (isActive: boolean) => ReturnType;
      /**
       * Unset the bold
       */
      unsetBold: () => ReturnType;
    };
  }
}

export const BoldMark = Mark.create<BoldOptions>({
  name: 'bold',

  group: 'inline',

  parseHTML() {
    return [
      {
        tag: 'strong',
      },
      {
        tag: 'b',
      },
      {
        style: 'font-weight',
        getAttrs: (value) => {
          if (typeof value === 'string' && /^(bold(er)?|[5-9]\d{2,})$/.test(value)) {
            return {
              fontWeight: 700,
            };
          }
          return false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['strong', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setBold:
        () =>
        ({ chain }) => {
          return chain().setMark('bold').run();
        },
      toggleBold:
        (isActive: boolean) =>
        ({ chain }) => {
          if (isActive) {
            return chain().unsetBold().run();
          }

          return chain().setBold().run();
        },
      unsetBold:
        () =>
        ({ chain }) => {
          return chain().unsetMark('bold').run();
        },
    };
  },
});
