import { createNode } from '@rrte/common';
import { VideoNode } from './node';
import { VideoBubbleMenu, ToolbarButton } from './toolbar';
import { UploadConfig } from './upload-config';

export const Video = (uploadConfig: UploadConfig) =>
  createNode(VideoNode, {
    toolbar: ToolbarButton,
    bubbleMenu: VideoBubbleMenu,
    translations: {
      en: {
        'video-button.text': 'Add video',
        'video-add.label': 'add video',
        'video-change.label': 'change video',
        'video-align-left.label': 'align left',
        'video-align-center.label': 'align center',
        'video-align-right.label': 'align right',
        'video-custom-size.label': 'custom size',
        'video-width.label': 'Width',
        'video-height.label': 'Height',
      },
      lt: {
        'video-button.text': 'Pridėti vaizdo įrašą',
        'video-change.label': 'Keisti vaizdo įrašą',
        'video-align-left.label': 'Lygiuoti kairėje',
        'video-align-center.label': 'Lygiuoti centre',
        'video-align-right.label': 'Lygiuoti dešinėje',
        'video-custom-size.label': 'Pasirinktinis dydis',
        'video-width.label': 'Plotis',
        'video-height.label': 'Aukštis',
      },
    },
    ...uploadConfig,
  });
