import { createExtension } from '@rrte/common';
import { historyExtension } from './extension';
import { ToolbarButtons } from './toolbar';

export const History = () =>
  createExtension(historyExtension, {
    toolbar: ToolbarButtons,
    translations: {
      en: {
        'redo-button.text': 'Redo',
        'undo-button.text': 'Undo',
        'voice-command.undo': 'undo',
        'voice-command.redo': 'redo',
        'history-group.text': 'History',
      },
      lt: {
        'redo-button.text': 'Grąžinti',
        'undo-button.text': 'Anuliuoti',
        'voice-command.undo': 'anuliuoti',
        'voice-command.redo': 'grąžinti',
        'history-group.text': 'Istorija',
      },
    },
  });
