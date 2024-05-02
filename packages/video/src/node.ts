import { Node, mergeAttributes } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { NeededVideoAttributes, VideoReturn } from './upload-config';
import { VideoComponent } from './video.component';

export interface VideoAttributes {
  src: string;
  isLoading: boolean;
  customSize: boolean | null;
  customWidth: number;
  customHeight: number;
  title: string | null;
  alignment: 'left' | 'center' | 'right';
}

export interface VideoOptions {
  HTMLAttributes: Record<string, any>;
  upload: ((file: File, imgAttr: NeededVideoAttributes) => Promise<VideoReturn>) | undefined;
  acceptedVideoFileTypes: string[];
  maxFileSize: number;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    video: {
      /**
       * Add an video
       */
      setVideo: (options: Partial<VideoAttributes>) => ReturnType;
      /**
       * Update an video by given ID
       */
      updateVideo: (options: Partial<VideoAttributes>, id: string) => ReturnType;
      /**
       * Remove an video by given ID
       */
      removeVideo: (id: string) => ReturnType;
    };
  }
}

export const VideoNode = Node.create<VideoOptions>({
  name: 'video',

  addOptions() {
    return {
      HTMLAttributes: {
        class: undefined,
      },
      upload: undefined,
      acceptedVideoFileTypes: [],
      maxFileSize: 0,
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      isLoading: {
        default: null,
      },
      alignment: {
        default: 'center',
      },
      customSize: {
        default: null,
      },
      customWidth: {
        default: 320,
      },
      title: {
        default: null,
      },
      customHeight: {
        default: 180,
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
        tag: 'video[src]',
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
    const width = HTMLAttributes.customSize ? `width: ${HTMLAttributes.customWidth}px;` : '';
    const height = HTMLAttributes.customSize ? `height: ${HTMLAttributes.customHeight}px;` : '';
    const marginLeft = `margin-left: ${HTMLAttributes.alignment === 'left' ? '0' : 'auto'};`;
    const marginRight = `margin-right: ${HTMLAttributes.alignment === 'right' ? '0' : 'auto'};`;
    const additionalAttributes = {
      style: `${width} ${height} ${marginLeft} ${marginRight} object-fit: fill;`,
      controls: true,
    };
    const wrapperStyle = `display:flex;justify-content:center;width:100%`;
    return [
      'div',
      { style: wrapperStyle },
      ['video', mergeAttributes(this.options.HTMLAttributes, restAttributes, additionalAttributes)],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(VideoComponent);
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('videoPastePlugin'),
        props: {
          handleDrop: (view, event, slice, moved) => {
            event.preventDefault();
            const upload = this.options.upload;
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
              if (
                file.size > this.options.maxFileSize ||
                !this.options.acceptedVideoFileTypes.includes(file.type)
              ) {
                return false;
              }
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = async e => {
                if (!e.target || !e.target.result) {
                  return;
                }
                const result = e.target.result;
                let src = '';
                if (typeof result === 'string') {
                  src = result;
                } else {
                  const blob = new Blob([result], { type: file.type });
                  src = URL.createObjectURL(blob);
                }
                if (!upload) {
                  return;
                }
                const videoAttributes = {
                  src,
                };

                // create a temp tiptap video node with correct dimensions
                const node = view.state.schema.nodes.video.create({
                  ...videoAttributes,
                  isLoading: true,
                });
                // insert the temp node
                const transaction = view.state.tr.replaceSelectionWith(node);
                view.dispatch(transaction);
                // get the position of the temp node
                const pos = view.state.selection.from;
                // get the temp node
                const nodeAtPos = view.state.doc.nodeAt(pos);
                if (!nodeAtPos) {
                  return;
                }
                const getUploadedAttributes = await upload(file, videoAttributes);
                const uploadedAttributes =
                  typeof getUploadedAttributes === 'function'
                    ? await getUploadedAttributes()
                    : getUploadedAttributes;
                if (!uploadedAttributes || uploadedAttributes === 'ERROR') {
                  return;
                }
                // get the id of the temp node
                const id = nodeAtPos.attrs.id;
                // find node by id
                view.state.doc.descendants((node, pos) => {
                  if (node.type.name === this.name && node.attrs.id === id) {
                    // update the temp node with the correct attributes
                    const transaction = view.state.tr.setNodeMarkup(pos, undefined, {
                      ...node.attrs,
                      ...uploadedAttributes,
                      isLoading: false,
                    });
                    view.dispatch(transaction);
                    return false;
                  }
                  return true;
                });
                return true;
              };
            }
            return false;
          },
          handlePaste: (view, event) => {
            const upload = this.options.upload;
            const items = Array.from(event.clipboardData?.items || []);
            for (const item of items) {
              if (item.type.indexOf('video') === 0) {
                const file = item.getAsFile();
                if (!file) {
                  continue;
                }
                if (
                  file.size > this.options.maxFileSize ||
                  !this.options.acceptedVideoFileTypes.includes(file.type)
                ) {
                  return false;
                }

                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = async e => {
                  if (!e.target || !e.target.result) {
                    return;
                  }
                  const result = e.target.result;
                  let src = '';
                  if (typeof result === 'string') {
                    src = result;
                  } else {
                    const blob = new Blob([result], { type: file.type });
                    src = URL.createObjectURL(blob);
                  }
                  if (!upload) {
                    return;
                  }
                  const videoAttributes = {
                    src,
                  };

                  // create a temp tiptap video node with correct dimensions
                  const node = view.state.schema.nodes.video.create({
                    ...videoAttributes,
                    isLoading: true,
                  });
                  // insert the temp node
                  const transaction = view.state.tr.replaceSelectionWith(node);
                  view.dispatch(transaction);
                  // get the position of the temp node
                  const pos = view.state.selection.from;
                  // get the temp node
                  const nodeAtPos = view.state.doc.nodeAt(pos);
                  if (!nodeAtPos) {
                    return;
                  }
                  const getUploadedAttributes = await upload(file, videoAttributes);
                  const uploadedAttributes =
                    typeof getUploadedAttributes === 'function'
                      ? await getUploadedAttributes()
                      : getUploadedAttributes;
                  if (!uploadedAttributes || uploadedAttributes === 'ERROR') {
                    return;
                  }
                  // get the id of the temp node
                  const id = nodeAtPos.attrs.id;
                  // find node by id
                  view.state.doc.descendants((node, pos) => {
                    if (node.type.name === this.name && node.attrs.id === id) {
                      // update the temp node with the correct attributes
                      const transaction = view.state.tr.setNodeMarkup(pos, undefined, {
                        ...node.attrs,
                        ...uploadedAttributes,
                        isLoading: false,
                      });
                      view.dispatch(transaction);
                      return false;
                    }
                    return true;
                  });
                  return true;
                };
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
      setVideo:
        attrs =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs,
          });
        },
      updateVideo:
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
      removeVideo:
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
