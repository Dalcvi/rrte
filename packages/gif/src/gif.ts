import { createNode } from '@rrte/common';
import { GifNode } from './node';
import { GifBubbleMenu, ToolbarButton } from './toolbar';

export const Gif = (sdkKey: string) =>
  createNode(GifNode, {
    toolbar: ToolbarButton,
    bubbleMenu: GifBubbleMenu,
    translations: {
      en: {
        'gif-button.text': 'Add GIF',
        'gif-search.text': 'Search GIF',
        'gif.replace': 'Replace GIF',
        'gif.align-left': 'Align left',
        'gif.align-center': 'Align center',
        'gif.align-right': 'Align right',
        'gif.custom-size': 'Custom size',
        'gif.width': 'Width',
        'gif.height': 'Height',
        'media-group.text': 'Footer toolbar',
      },
      lt: {
        'gif-button.text': 'Pridėti GIF',
        'gif-search.text': 'Ieškoti GIF',
        'gif.replace': 'Pakeisti GIF',
        'gif.align-left': 'Lygiuoti kairėje',
        'gif.align-center': 'Lygiuoti centre',
        'gif.align-right': 'Lygiuoti dešinėje',
        'gif.custom-size': 'Pasirinktinis dydis',
        'gif.width': 'Plotis',
        'gif.height': 'Aukštis',
        'media-group.text': 'Apatinis įrankių juostelės elementas',
      },
    },
    sdkKey,
  });
