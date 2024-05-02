import type {} from '@rrte/text-style';
import { Extension } from '@tiptap/core';

export type FontSizeOptions = {
  types: string[];
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the text font size in any units
       */
      setFontSize: (size: string) => ReturnType;
      /**
       * Unset the text font size
       */
      unsetFontSize: () => ReturnType;
      /**
       * Increase the text font size by 1px
       *
       */
      increaseFontSize: () => ReturnType;
      /**
       * Decrease the text font size by 1px
       */
      decreaseFontSize: () => ReturnType;
    };
  }
}

export const FontSizeExtension = Extension.create<FontSizeOptions>({
  name: 'fontSize',

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
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {};
              }

              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        fontSize =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run();
        },
    };
  },
});
