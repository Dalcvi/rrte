import { createExtension } from '@rrte/common';
import { ColorExtension } from './extension';
import { ToolbarButton } from './toolbar';

export const Color = () =>
  createExtension(ColorExtension, {
    toolbar: ToolbarButton,
    translations: {
      en: {
        'color-button.text': 'Color',
        'color-remove.text': 'Remove color',
        'voice-command.remove-color': 'remove color',
        'text-colouring-group.text': 'Text colouring',
      },
      lt: {
        'color-button.text': 'Spalva',
        'color-remove.text': 'Pašalinti spalvą',
        'voice-command.remove-color': 'pašalinti spalvą',
        'text-colouring-group.text': 'Teksto spalvos',
      },
    },
  });
