import { Extension, getMarkAttributes, Mark, mergeAttributes } from '@tiptap/core';

type Alignment = 'left' | 'center' | 'right' | 'justify';

export interface TextAlignOptions {
  types: string[];
  defaultAlignment: Alignment;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textAlign: {
      /**
       * Set the text alignment
       * @param textAlign - 'left', 'center', 'right', 'justify'
       */
      setTextAlign: (textAlign: Alignment) => ReturnType;
    };
  }
}

export const TextAlignExtension = Extension.create<TextAlignOptions>({
  name: 'textAlign',

  addOptions() {
    return {
      types: ['heading', 'paragraph'],
      defaultAlignment: 'left',
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textAlign: {
            default: this.options.defaultAlignment,
            parseHTML: (element) => {
              return {
                textAlign: element.style.textAlign ?? this.options.defaultAlignment,
              };
            },
            renderHTML: (attributes) => {
              return {
                style: `text-align: ${attributes.textAlign}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setTextAlign:
        (textAlign) =>
        ({ commands }) => {
          return this.options.types.some((type) => {
            return commands.updateAttributes(type, { textAlign });
          });
        },
    };
  },
});
