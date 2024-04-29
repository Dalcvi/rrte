import { ListItemNode } from './node';
import { createNode } from '@rrte/common';

export const ListItem = () =>
  createNode(ListItemNode, {
    translations: {
      en: {
        'voice-command.split-list-item': 'split list item',
        'voice-command.sink-list-item': 'sink list item',
        'voice-command.lift-list-item': 'lift list item',
      },
      lt: {
        'voice-command.split-list-item': 'padalinti sąrašo elementą',
        'voice-command.sink-list-item': 'nuleisti sąrašo elementą',
        'voice-command.lift-list-item': 'pakelti sąrašo elementą',
      },
    },
  });
