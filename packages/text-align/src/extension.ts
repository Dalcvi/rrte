import { Extension } from '@tiptap/core';
import type {} from '@rrte/common';

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
            parseHTML: element => {
              return element.style.textAlign ?? this.options.defaultAlignment;
            },
            renderHTML: attributes => {
              return {
                style: `text-align: ${attributes.textAlign}`,
              };
            },
          },
        },
      },
    ];
  },

  speechCommands: t => [
    {
      group: t('voice-group.text-alignment'),
      activationKeyword: t('voice-command.align-left'),
      command: 'setTextAlign',
      params: [{ textAlign: 'left' }],
      description: 'Align left',
    },
    {
      group: t('voice-group.text-alignment'),
      activationKeyword: t('voice-command.align-center'),
      command: 'setTextAlign',
      params: [{ textAlign: 'center' }],
      description: 'Align center',
    },
    {
      group: t('voice-group.text-alignment'),
      activationKeyword: t('voice-command.align-right'),
      command: 'setTextAlign',
      params: [{ textAlign: 'right' }],
      description: 'Align right',
    },
    {
      group: t('voice-group.text-alignment'),
      activationKeyword: t('voice-command.justify'),
      command: 'setTextAlign',
      params: [{ textAlign: 'justify' }],
      description: 'Align justify',
    },
  ],

  addCommands() {
    return {
      setTextAlign:
        textAlign =>
        ({ commands }) => {
          this.options.types.forEach(type => {
            return commands.updateAttributes(type, { textAlign });
          });

          return true;
        },
    };
  },
});
