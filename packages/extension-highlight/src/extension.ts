import type {} from '@rrte/extension-text-style';

import { Extension, isMarkActive } from '@tiptap/core';

export type HighlightOptions = {
  types: string[];
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    highlight: {
      /**
       * Set the text highlight
       */
      setHighlight: (highlight: string | null) => ReturnType;
      /**
       * Unset the text highlight
       */
      unsetHighlight: () => ReturnType;
    };
  }
}

export const HighlightExtension = Extension.create<HighlightOptions>({
  name: 'highlight',

  addOptions() {
    return {
      types: ['textStyle'],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          backgroundColor: {
            default: null,
            parseHTML: (element) => element.style.backgroundColor?.replace(/['"]+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.backgroundColor) {
                return {};
              }

              return {
                style: `background-color: ${attributes.backgroundColor}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setHighlight:
        (highlight) =>
        ({ chain }) => {
          return chain().setMark('textStyle', { backgroundColor: highlight }).run();
        },
      unsetHighlight:
        () =>
        ({ commands }) => {
          return (
            commands.setMark('textStyle', { backgroundColor: null }) && commands.removeEmptyTextStyle('backgroundColor')
          );
        },
    };
  },
});
