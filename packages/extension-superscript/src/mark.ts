import { Mark, mergeAttributes } from '@tiptap/core';

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
      toggleSuperscript: (isActive: boolean) => ReturnType;
      /**
       * Unset the superscript
       */
      unsetSuperscript: () => ReturnType;
    };
  }
}

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
        getAttrs: (value) => {
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
        ({ commands }) => {
          commands.unsetMark('subscript');
          return commands.setMark('superscript');
        },
      toggleSuperscript:
        (isActive: boolean) =>
        ({ commands }) => {
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
});
