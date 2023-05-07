import { Mark, mergeAttributes } from '@tiptap/core';

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
      toggleStrike: (isActive: boolean) => ReturnType;
      /**
       * Unset the strike
       */
      unsetStrike: () => ReturnType;
    };
  }
}

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
        getAttrs: (value) => {
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

  addCommands() {
    return {
      setStrike:
        () =>
        ({ commands }) => {
          return commands.setMark('strike');
        },
      toggleStrike:
        (isActive: boolean) =>
        ({ commands }) => {
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
});
