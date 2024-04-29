import type {} from '@rrte/text-style';
import { Extension } from '@tiptap/core';

export const VoiceExtension = Extension.create({
  name: 'voice',

  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          streaming: {
            default: null,
            renderHTML: attributes => {
              if (!attributes.streaming) {
                return {};
              }

              return {
                'data-streaming': attributes.streaming,
              };
            },
          },
        },
      },
    ];
  },
});
