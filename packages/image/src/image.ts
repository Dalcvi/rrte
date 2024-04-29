import { createNode } from '@rrte/common';
import { ImageNode } from './node';
import { ImageBubbleMenu, ToolbarButton } from './toolbar';
import { UploadConfig } from './upload-config';

export const Image = (uploadConfig: UploadConfig) =>
  createNode(ImageNode, {
    toolbar: ToolbarButton,
    bubbleMenu: ImageBubbleMenu,
    translations: {
      en: {
        'image-button.text': 'Add image',
        'image-change.text': 'Change image',
        'image.align-left': 'Align left',
        'image.align-center': 'Align center',
        'image.align-right': 'Align right',
        'image.custom-size': 'Custom size',
        'image.alt': 'Alt text',
        'image.width': 'Width',
        'image.height': 'Height',
      },
      lt: {
        'image-button.text': 'Pridėti nuotrauką',
        'image-change.text': 'Keisti nuotrauką',
        'image.align-left': 'Lygiuoti kairėje',
        'image.align-center': 'Lygiuoti centre',
        'image.align-right': 'Lygiuoti dešinėje',
        'image.custom-size': 'Pasirinktinis dydis',
        'image.alt': 'Alt. tekstas',
        'image.width': 'Plotis',
        'image.height': 'Aukštis',
      },
    },
    ...uploadConfig,
  });
