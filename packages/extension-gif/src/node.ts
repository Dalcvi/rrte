import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { GifComponent } from './gif.component';

export interface GifAttributes {
  webp: string;
  mp4: string;
  originalWidth: number;
  originalHeight: number;
  alt: string | null;
  customSize: boolean | null;
  width: number | null;
  height: number | null;
  alignment: 'left' | 'center' | 'right';
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    gif: {
      /**
       * Set a gif node
       */
      setGif: ({
        webp,
        mp4,
        originalWidth,
        originalHeight,
        alt,
      }: {
        webp?: string;
        mp4?: string;
        originalWidth: number;
        originalHeight: number;
        alt?: string;
      }) => ReturnType;
    };
  }
}

export const GifNode = Node.create({
  name: 'gif',

  group: 'block',

  atom: true,

  selectable: true,

  draggable: true,

  addAttributes() {
    return {
      webp: {
        default: null,
      },
      mp4: {
        default: null,
      },
      originalWidth: {
        default: null,
      },
      originalHeight: {
        default: null,
      },
      alt: {
        default: null,
      },
      alignment: {
        default: 'center',
      },
      customSize: {
        default: null,
      },
      width: {
        default: null,
      },
      height: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [{ tag: 'gif-node' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['gif-node', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(GifComponent);
  },

  addCommands() {
    return {
      setGif:
        ({ webp, mp4, originalWidth, originalHeight, alt }) =>
        ({ commands }) => {
          const attrs = {
            webp,
            mp4,
            originalWidth,
            originalHeight,
            alt,
          };
          return commands.insertContent({
            type: this.name,
            attrs,
          });
        },
    };
  },
});
