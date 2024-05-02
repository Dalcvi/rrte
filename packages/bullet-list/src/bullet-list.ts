import { createNode } from '@rrte/common';
import { BulletListNode } from './node';
import { ToolbarButton } from './toolbar';

export const BulletList = () =>
  createNode(BulletListNode, {
    toolbar: ToolbarButton,
    translations: {
      en: {
        'bullet-list-button.text': 'Toggle bullet list',
        'voice-command.toggle-bullet-list': 'toggle bullet list',
        'lists.text': 'Lists',
      },
      lt: {
        'bullet-list-button.text': 'Perjungti ženklelių sąrašą',
        'voice-command.toggle-bullet-list': 'pakeisti ženklelių sąrašą',
        'lists.text': 'Sąrašai',
      },
    },
  });
