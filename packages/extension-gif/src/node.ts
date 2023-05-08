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
  customWidth: number | null;
  customHeight: number | null;
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
      customWidth: {
        default: null,
      },
      customHeight: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
        getAttrs: (dom) => {
          if (!(dom instanceof HTMLElement)) {
            return false;
          }
          const src = dom.getAttribute('src');
          if (src === null || !src.includes('giphy')) {
            return false;
          }

          return {
            originalWidth: dom.getAttribute('originalWidth'),
            originalHeight: dom.getAttribute('originalHeight'),
            alt: dom.getAttribute('alt'),
            customSize: dom.getAttribute('customSize'),
            customWidth: dom.getAttribute('customWidth'),
            customHeight: dom.getAttribute('customHeight'),
            webp: dom.getAttribute('webp'),
            mp4: dom.getAttribute('mp4'),
            alignment: dom.getAttribute('alignment'),
          };
        },
      },
      {
        tag: 'video[src]',
        getAttrs: (dom) => {
          if (!(dom instanceof HTMLElement)) {
            return false;
          }
          const src = dom.getAttribute('src');
          if (src === null || !src.includes('giphy')) {
            return false;
          }

          return {
            originalWidth: dom.getAttribute('originalWidth'),
            originalHeight: dom.getAttribute('originalHeight'),
            alt: dom.getAttribute('alt'),
            customSize: dom.getAttribute('customSize'),
            customWidth: dom.getAttribute('customWidth'),
            customHeight: dom.getAttribute('customHeight'),
            webp: dom.getAttribute('webp'),
            mp4: dom.getAttribute('mp4'),
            alignment: dom.getAttribute('alignment'),
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { id, ...restAttributes } = HTMLAttributes;
    const width = HTMLAttributes.customSize
      ? `width: ${HTMLAttributes.customWidth === null ? HTMLAttributes.originalWidth : HTMLAttributes.customWidth}px;`
      : '';
    const height = HTMLAttributes.customSize
      ? `height: ${
          HTMLAttributes.customHeight === null ? HTMLAttributes.originalHeight : HTMLAttributes.customHeight
        }px;`
      : '';
    const src = HTMLAttributes.webp ? HTMLAttributes.webp : HTMLAttributes.mp4;
    const srcAttribute = { src };
    const marginLeft = `margin-left: ${HTMLAttributes.alignment === 'left' ? '0' : 'auto'};`;
    const marginRight = `margin-right: ${HTMLAttributes.alignment === 'right' ? '0' : 'auto'};`;
    const style = { style: `${width} ${height} ${marginLeft} ${marginRight}` };
    const wrapperStyle = `display:flex;justify-content:center;width:100%`;
    const element = HTMLAttributes.webp ? 'img' : 'video';
    return [
      'div',
      { style: wrapperStyle },
      [element, mergeAttributes(this.options.HTMLAttributes, restAttributes, style, srcAttribute)],
    ];
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
