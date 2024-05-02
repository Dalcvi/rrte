import { createNode } from '@rrte/common';
import { ImageNode } from './node';
import {
  ExtensionControlledToolbarButton,
  ImageBubbleMenu,
  UserControlledToolbarButton,
} from './toolbar';
import { UploadConfig } from './upload-config';

export const Image = (uploadConfig: UploadConfig) =>
  createNode(ImageNode, {
    toolbar: (uploadConfig.type === 'extension-controlled'
      ? ExtensionControlledToolbarButton
      : UserControlledToolbarButton) as any,
    bubbleMenu: ImageBubbleMenu,
    translations: {
      en: {
        'image-button.text': 'Add image',
        'image-change.text': 'Change image',
        'image.align-left': 'Align left',
        'image.align-center': 'Align center',
        'image.align-right': 'Align right',
        'image.custom-size': 'Custom size',
        'image.caption': 'Caption',
        'image.accessibility': 'Accessibility',
        'image.alt': 'Alt text',
        'image.width': 'Width',
        'image.height': 'Height',
        'media-group.text': 'Footer toolbar',
      },
      lt: {
        'image-button.text': 'Pridėti nuotrauką',
        'image-change.text': 'Keisti nuotrauką',
        'image.align-left': 'Lygiuoti kairėje',
        'image.align-center': 'Lygiuoti centre',
        'image.align-right': 'Lygiuoti dešinėje',
        'image.custom-size': 'Pasirinktinis dydis',
        'image.alt': 'Alt. tekstas',
        'image.caption': 'Antraštė',
        'image.accessibility': 'Prieinamumas',
        'image.width': 'Plotis',
        'image.height': 'Aukštis',
        'media-group.text': 'Apatinis įrankių juostelės elementas',
      },
    },
    ...uploadConfig,
  });
