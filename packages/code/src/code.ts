import { createMark } from '@rrte/common';
import { CodeMark } from './mark';
import { ToolbarButton } from './toolbar';

export const Code = () =>
  createMark(CodeMark, {
    toolbar: ToolbarButton,
    translations: {
      en: {
        'code-button.text': 'Toggle inline code',
        'voice-command.toggle-code': 'toggle inline code',
      },
      lt: {
        'code-button.text': 'Perjungti eilutinį kodą',
        'voice-command.toggle-code': 'pakeisti eilutinį kodą',
      },
    },
  });
