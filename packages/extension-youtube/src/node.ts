import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { YoutubeComponent } from './youtube.component';
import { getYouTubeID } from './toolbar/toolbar.utils';

export interface YoutubeAttributes {
  url: string;
  videoId: string;
  defaultWidth: number;
  customSize: boolean | null;
  customWidth: number;
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
      defaultWidth: {
        default: 640,
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
    };
  },

  parseHTML() {
    return [
      {
        tag: 'iframe[url][videoId]',
        getAttrs: (dom) => {
          if (!(dom instanceof HTMLElement)) {
            return false;
          }
          const url = dom.getAttribute('url');
          const videoId = dom.getAttribute('videoId');
          if (!url || (!url.includes('youtube.com') && !url.includes('youtu.be') && !videoId)) {
            return false;
          }
          if (!url || (!url.includes('youtube.com') && !url.includes('youtu.be'))) {
            dom.setAttribute('url', `https://www.youtube.com/watch?v=${videoId}`);
          }
          if (!videoId) {
            const youtubeId = getYouTubeID(url);
            if (youtubeId) {
              dom.setAttribute('videoId', youtubeId);
            }
          }

          return {
            url: dom.getAttribute('url'),
            videoId: dom.getAttribute('videoId'),
            customSize: dom.getAttribute('customSize'),
            customWidth: dom.getAttribute('customWidth'),
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { id, ...restAttributes } = HTMLAttributes;
    const marginLeft = `margin-left: ${HTMLAttributes.alignment === 'left' ? '0' : 'auto'};`;
    const marginRight = `margin-right: ${HTMLAttributes.alignment === 'right' ? '0' : 'auto'};`;
    const additionalAttributes = {
      style: `${marginLeft} ${marginRight}`,
      src: `https://www.youtube.com/embed/${HTMLAttributes.videoId}`,
      frameBorder: '0',
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      allowFullScreen: true,
      width: HTMLAttributes.customSize && HTMLAttributes.customWidth ? `${HTMLAttributes.customWidth};` : '640',
      height:
        HTMLAttributes.customSize && HTMLAttributes.customWidth ? `${(9 * HTMLAttributes.customWidth) / 16};` : '360',
    };
    const wrapperStyle = `display:flex;justify-content:center;width:100%`;
    return [
      'div',
      { style: wrapperStyle },
      ['iframe', mergeAttributes(this.options.HTMLAttributes, restAttributes, additionalAttributes)],
    ];
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
