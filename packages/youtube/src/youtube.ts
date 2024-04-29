import { createNode } from '@rrte/common';
import { YoutubeNode } from './node';
import { YoutubeBubbleMenu, ToolbarButton } from './toolbar';

export const Youtube = () =>
  createNode(YoutubeNode, {
    toolbar: ToolbarButton,
    bubbleMenu: YoutubeBubbleMenu,
    translations: {
      en: {
        'youtube-input.label': 'Youtube URL',
        'youtube-url-input.label': 'Youtube URL',
        'youtube-button.text': 'Add youtube video',
        'youtube-align-left.label': 'Align left',
        'youtube-align-center.label': 'Align center',
        'youtube-align-right.label': 'Align right',
        'youtube-custom-size.label': 'Custom size',
        'youtube-width.label': 'Width',
        'youtube-button.placeholder': 'Enter Youtube URL',
        'youtube-add': 'Add',
      },
      lt: {
        'youtube-input.label': 'Youtube adresas',
        'youtube-url-input.label': 'Youtube adresas',
        'youtube-button.text': 'Pridėti Youtube vaizdo įrašą',
        'youtube-align-left.label': 'Lygiuoti kairėje',
        'youtube-align-center.label': 'Lygiuoti centre',
        'youtube-align-right.label': 'Lygiuoti dešinėje',
        'youtube-custom-size.label': 'Pasirinktinis dydis',
        'youtube-width.label': 'Plotis',
        'youtube-button.placeholder': 'Įveskite Youtube adresą',
        'youtube-add': 'Pridėti',
      },
    },
  });
