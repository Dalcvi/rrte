import { createNode } from '@rrte/common';
import { OrderedListNode } from './node';
import { ToolbarButton } from './toolbar';

export const OrderedList = () =>
  createNode(OrderedListNode, {
    toolbar: ToolbarButton,
    translations: {
      en: {
        'ordered-list-button.text': 'Toggle ordered list',
        'voice-command.toggle-ordered-list': 'toggle ordered list',
        'lists.text': 'Lists',
      },
      lt: {
        'ordered-list-button.text': 'Perjungti numeruotą sąrašą',
        'voice-command.toggle-ordered-list': 'pakeisti numeruotą sąrašą',
        'lists.text': 'Sąrašai',
      },
    },
  });
