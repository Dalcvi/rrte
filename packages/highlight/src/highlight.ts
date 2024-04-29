import { createExtension } from '@rrte/common';
import { HighlightExtension } from './extension';
import { ToolbarButton } from './toolbar';

export const Highlight = () =>
  createExtension(HighlightExtension, {
    toolbar: ToolbarButton,
    translations: {
      en: {
        'highlight-button.text': 'Highlight',
        'highlight-button.remove': 'Remove highlight',
        'voice-command.remove-highlight': 'remove highlight',
      },
      lt: {
        'highlight-button.text': 'Paryškinimas',
        'highlight-button.remove': 'Pašalinti paryškinimą',
        'voice-command.remove-highlight': 'pašalinti paryškinimą',
      },
    },
  });
