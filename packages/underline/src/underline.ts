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
      },
      lt: {
        'underline-button.text': 'Pakeisti pabraukimą',
        'voice-command.toggle-underline': 'pakeisti pabraukimą',
      },
    },
  });
