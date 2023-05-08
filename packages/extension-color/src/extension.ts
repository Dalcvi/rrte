import type {} from '@rrte/extension-text-style';

import { Extension } from '@tiptap/core';

export type ColorOptions = {
  types: string[];
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    color: {
      /**
       * Set the text color
       */
      setColor: (color: string | null) => ReturnType;
      /**
       * Unset the text color
       */
      unsetColor: () => ReturnType;
    };
  }
}

export const ColorExtension = Extension.create<ColorOptions>({
  name: 'color',

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
          color: {
            default: null,
            parseHTML: (element) => element.style.color?.replace(/['"]+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.color) {
                return {};
              }

              return {
                style: `color: ${attributes.color}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setColor:
        (color) =>
        ({ chain }) => {
          return chain().setMark('textStyle', { color }).run();
        },
      unsetColor:
        () =>
        ({ commands }) => {
          return commands.setMark('textStyle', { color: null }) && commands.removeEmptyTextStyle('color');
        },
    };
  },
});
