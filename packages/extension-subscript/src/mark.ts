import { Mark, mergeAttributes } from '@tiptap/core';

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
      toggleSubscript: (isActive: boolean) => ReturnType;
      /**
       * Unset the subscript
       */
      unsetSubscript: () => ReturnType;
    };
  }
}

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
        getAttrs: (value) => {
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

  addCommands() {
    return {
      setSubscript:
        () =>
        ({ commands }) => {
          commands.unsetMark('superscript');
          return commands.setMark('subscript');
        },
      toggleSubscript:
        (isActive: boolean) =>
        ({ commands }) => {
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
});
