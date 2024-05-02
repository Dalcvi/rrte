import { createMark } from '@rrte/common';
import { UnderlineMark } from './mark';
import { ToolbarButton } from './toolbar';

export const Underline = () =>
  createMark(UnderlineMark, {
    toolbar: ToolbarButton,
    translations: {
      en: {
        'underline-button.text': 'Toggle underline',
        'voice-command.toggle-underline': 'toggle underline',
        'text-style-group.text': 'Text style',
        'text-styling-group.text': 'Text styling',
      },
      lt: {
        'underline-button.text': 'Pakeisti pabraukimą',
        'voice-command.toggle-underline': 'pakeisti pabraukimą',
        'text-style-group.text': 'Teksto stilius',
        'text-styling-group.text': 'Teksto stiliavimas',
      },
    },
  });
