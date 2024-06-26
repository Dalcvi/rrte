import { createMark } from '@rrte/common';
import { StrikeMark } from './mark';
import { ToolbarButton } from './toolbar';

export const Strike = () =>
  createMark(StrikeMark, {
    toolbar: ToolbarButton,
    translations: {
      en: {
        'strike-button.text': 'Toggle strike',
        'voice-command.toggle-strike': 'toggle strike',
        'text-styling-group.text': 'Text styling',
      },
      lt: {
        'strike-button.text': 'Perjungti perbraukimą',
        'voice-command.toggle-strike': 'pakeisti perbraukimą',
        'text-styling-group.text': 'Teksto stiliavimas',
      },
    },
  });
