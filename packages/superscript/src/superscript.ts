import { createMark } from '@rrte/common';
import { SuperscriptMark } from './mark';
import { ToolbarButton } from './toolbar';

export const Superscript = () =>
  createMark(SuperscriptMark, {
    toolbar: ToolbarButton,
    translations: {
      en: {
        'superscript-button.text': 'Toggle superscript',
        'voice-command.toggle-superscript': 'toggle superscript',
      },
      lt: {
        'superscript-button.text': 'Perjungti viršutinį indeksą',
        'voice-command.toggle-superscript': 'pakeisti viršutinį indeksą',
      },
    },
  });
