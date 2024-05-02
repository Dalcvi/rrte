import { createMark } from '@rrte/common';
import { BoldMark } from './mark';
import { ToolbarButton } from './toolbar';

export const Bold = () =>
  createMark(BoldMark, {
    toolbar: ToolbarButton,
    translations: {
      en: {
        'bold-button.text': 'Toggle bold',
        'voice-command.toggle-bold': 'toggle bold',
        'text-styling-group.text': 'Text styling',
      },
      lt: {
        'bold-button.text': 'Perjungti paryškinimą',
        'voice-command.toggle-bold': 'pakeisti paryškinimą',
        'text-styling-group.text': 'Teksto stiliavimas',
      },
    },
  });
