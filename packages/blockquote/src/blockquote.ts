import { createNode } from '@rrte/common';
import { BlockquoteNode } from './node';
import { ToolbarButton } from './toolbar';

export const Blockquote = () =>
  createNode(BlockquoteNode, {
    toolbar: ToolbarButton,
    translations: {
      en: {
        'blockquote-button.text': 'Toggle blockquote',
        'voice-command.toggle-blockquote': 'toggle bold',
      },
      lt: {
        'blockquote-button.text': 'Perjungti citatą',
        'voice-command.toggle-blockquote': 'pakeisti citata',
      },
    },
  });
