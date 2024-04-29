import { Node, mergeAttributes } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { ImageComponent } from './image.component';
import { fileUpload } from './node.utils';
import { ImageReturn, NeededImageAttributes } from './upload-config';

export interface ImageAttributes {
  src: string;
  originalWidth: number;
  originalHeight: number;
  alt: string | null;
  customSize: boolean | null;
  customWidth: number | null;
  customHeight: number | null;
  isLoading: boolean;
  alignment: 'left' | 'center' | 'right';
}

export interface ImageOptions {
  HTMLAttributes: Record<string, any>;
  upload: ((file: File, imgAttr: NeededImageAttributes) => Promise<ImageReturn>) | undefined;
  acceptedImageFileTypes: string[];
  maxFileSize: number;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      /**
       * Add an image
       */
      setImage: (options: Partial<ImageAttributes>) => ReturnType;
      /**
       * Update an image by given ID
       */
      updateImage: (options: Partial<ImageAttributes>, id: string) => ReturnType;
      /**
       * Remove an image by given ID
       */
      removeImage: (id: string) => ReturnType;
    };
  }
}

export const ImageNode = Node.create<ImageOptions>({
  name: 'image',
  addOptions() {
    return {
      HTMLAttributes: {
        class: undefined,
      },
      upload: undefined,
      acceptedImageFileTypes: [],
      maxFileSize: 0,
    };
  },

  addAttributes() {
    return {
      src: {
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
      customSize: {
        default: null,
      },
      customWidth: {
        default: null,
      },
      customHeight: {
        default: null,
      },
      isLoading: {
        default: null,
      },
      alignment: {
        default: 'center',
      },
    };
  },

  group: 'block',

  atom: true,

  selectable: true,

  draggable: true,

  parseHTML() {
    return [
      {
        tag: 'img[src]',
        getAttrs: dom => {
          if (!(dom instanceof HTMLElement)) {
            return false;
          }
          const src = dom.getAttribute('src');
          if (src === null || src.includes('giphy')) {
            return false;
          }

          return {
            src,
            originalWidth: dom.getAttribute('originalWidth'),
            originalHeight: dom.getAttribute('originalHeight'),
            alt: dom.getAttribute('alt'),
            customSize: dom.getAttribute('customSize'),
            customWidth: dom.getAttribute('customWidth'),
            customHeight: dom.getAttribute('customHeight'),
            isLoading: dom.getAttribute('isLoading'),
            alignment: dom.getAttribute('alignment'),
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...restAttributes } = HTMLAttributes;
    const width = HTMLAttributes.customSize
      ? `width: ${
          HTMLAttributes.customWidth === null
            ? HTMLAttributes.originalWidth
            : HTMLAttributes.customWidth
        }px;`
      : '';
    const height = HTMLAttributes.customSize
      ? `height: ${
          HTMLAttributes.customHeight === null
            ? HTMLAttributes.originalHeight
            : HTMLAttributes.customHeight
        }px;`
      : '';
    const marginLeft = `margin-left: ${HTMLAttributes.alignment === 'left' ? '0' : 'auto'};`;
    const marginRight = `margin-right: ${HTMLAttributes.alignment === 'right' ? '0' : 'auto'};`;
    const style = { style: `${width} ${height} ${marginLeft} ${marginRight}` };

    const wrapperStyle = `display:flex;justify-content:center;width:100%`;
    return [
      'div',
      { style: wrapperStyle },
      ['img', mergeAttributes(this.options.HTMLAttributes, restAttributes, style)],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent);
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('imagePastePlugin'),
        props: {
          handleDrop: (view, event, _, moved) => {
            event.preventDefault();
            if (
              !moved &&
              event.dataTransfer &&
              event.dataTransfer.files &&
              event.dataTransfer.files[0]
            ) {
              let file = event.dataTransfer.files[0];
              if (!file) {
                return false;
              }
              fileUpload(file, this.options, view);
              return true;
            }
            return false;
          },
          handlePaste: (view, event) => {
            const items = Array.from(event.clipboardData?.items || []);
            for (const item of items) {
              if (item.type.indexOf('image') === 0) {
                const file = item.getAsFile();
                if (!file) {
                  continue;
                }
                fileUpload(file, this.options, view);
                return true;
              }
            }
            return false;
          },
        },
      }),
    ];
  },

  addCommands() {
    return {
      setImage:
        attrs =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs,
          });
        },
      updateImage:
        (attrs, id) =>
        ({ tr }) => {
          tr.doc.descendants((node, pos) => {
            if (node.type.name === this.name && node.attrs.id === id) {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                ...attrs,
              });
              return false;
            }
            return true;
          });

          return true;
        },
      removeImage:
        id =>
        ({ tr }) => {
          tr.doc.descendants((node, pos) => {
            if (node.type.name === this.name && node.attrs.id === id) {
              tr.delete(pos, pos + node.nodeSize);
              return false;
            }
            return true;
          });
          return true;
        },
    };
  },
});
