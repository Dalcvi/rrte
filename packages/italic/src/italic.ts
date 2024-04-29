import { createMark } from '@rrte/common';
import { ItalicMark } from './mark';
import { ToolbarButton } from './toolbar';

export const Italic = () =>
  createMark(ItalicMark, {
    toolbar: ToolbarButton,
    translations: {
      en: {
        'italic-button.text': 'Toggle italic',
        'voice-command.toggle-italic': 'toggle italic',
      },
      lt: {
        'italic-button.text': 'Perjungti kursyvą',
        'voice-command.toggle-italic': 'pakeisti kursyvą',
      },
    },
  });
