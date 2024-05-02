import { createMark } from '@rrte/common';
import { SubscriptMark } from './mark';
import { ToolbarButton } from './toolbar';

export const Subscript = () =>
  createMark(SubscriptMark, {
    toolbar: ToolbarButton,
    translations: {
      en: {
        'subscript-button.text': 'Toggle subscript',
        'voice-command.toggle-subscript': 'toggle subscript',
        'text-styling-group.text': 'Text styling',
      },
      lt: {
        'subscript-button.text': 'Pakeisti apatinį indeksą',
        'voice-command.toggle-subscript': 'pakeisti apatinį indeksą',
        'text-styling-group.text': 'Teksto stiliavimas',
      },
    },
  });
