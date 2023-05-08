import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { YoutubeComponent } from './youtube.component';

export interface YoutubeAttributes {
  url: string;
  videoId: string;
  customSize: boolean | null;
  width: number;
  alignment: 'left' | 'center' | 'right';
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    youtube: {
      /**
       * Set a youtube node
       */
      setYoutube: ({ url, id }: { url: string; id: string }) => ReturnType;
    };
  }
}

export const YoutubeNode = Node.create({
  name: 'youtube',

  group: 'block',

  atom: true,

  selectable: true,

  draggable: true,

  addAttributes() {
    return {
      url: {
        default: null,
      },
      videoId: {
        default: null,
      },
      alignment: {
        default: 'center',
      },
      customSize: {
        default: null,
      },
      width: {
        default: 320,
      },
    };
  },

  parseHTML() {
    return [{ tag: 'youtube-node' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['youtube-node', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(YoutubeComponent);
  },

  addCommands() {
    return {
      setYoutube:
        ({ url, id }) =>
        ({ commands }) => {
          const attrs = {
            url,
            videoId: id,
          };
          return commands.insertContent({
            type: this.name,
            attrs,
          });
        },
    };
  },
});
