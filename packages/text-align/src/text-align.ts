import { TextAlignExtension } from './extension';
import { createExtension } from '@rrte/common';
import {
  CenterAlignToolbarButton,
  JustifyAlignToolbarButton,
  LeftAlignToolbarButton,
  RightAlignToolbarButton,
} from './toolbar';

export const TextAlign = ({ attachToNodes }: { attachToNodes?: string[] } = {}) => {
  const defaultTypes = ['paragraph', 'heading'];
  const types = attachToNodes ?? defaultTypes;
  return createExtension(
    TextAlignExtension.configure({
      types: types,
    }),
    {
      toolbar: [
        LeftAlignToolbarButton,
        RightAlignToolbarButton,
        CenterAlignToolbarButton,
        JustifyAlignToolbarButton,
      ],
      types,
      translations: {
        en: {
          'left-align-button.text': 'Align text left',
          'right-align-button.text': 'Align text right',
          'center-align-button.text': 'Center text',
          'justify-align-button.text': 'Justify text',
          'voice-command.align-left': 'align text left',
          'voice-command.align-right': 'align text right',
          'voice-command.align-center': 'center text',
          'voice-command.justify': 'justify text',
        },
        lt: {
          'left-align-button.text': 'Lygiuoti tekstą kairėje',
          'right-align-button.text': 'Lygiuoti tekstą dešinėje',
          'center-align-button.text': 'Lygiuoti tekstą center',
          'justify-align-button.text': 'Išlyginti tekstą',
          'voice-command.align-left': 'lygiuoti tekstą kairėje',
          'voice-command.align-right': 'lygiuoti tekstą dešinėje',
          'voice-command.align-center': 'lygiuoti tekstą centre',
          'voice-command.justify': 'išlyginti tekstą',
        },
      },
    }
  );
};
