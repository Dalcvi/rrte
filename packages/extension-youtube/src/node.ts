import { Node, mergeAttributes } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    youtube: {
      /**
       * Set a youtube node
       */
      setYoutube: () => ReturnType;
      /**
       * Toggle a youtube node
       */
      toggleYoutube: () => ReturnType;
      /**
       * Unset a youtube node
       */
      unsetYoutube: () => ReturnType;
    };
  }
}

export const YoutubeNode = Node.create({
  name: 'youtube',

  priority: 1000,

  keepOnSplit: false,

  allowGapCursor: true,

  exitable: true,

  addAttributes() {
    return {};
  },

  parseHTML() {
    return [{ tag: 'youtube-node' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['youtube-node', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setYoutube:
        () =>
        ({ chain }) => {
          return true;
        },

      toggleYoutube:
        () =>
        ({ chain, commands, state }) => {
          return true;
        },

      unsetYoutube:
        () =>
        ({ chain }) => {
          return true;
        },
    };
  },
});
