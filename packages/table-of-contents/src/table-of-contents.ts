import { createNode } from '@rrte/common';
import { TableOfContentsNode } from './node';
import { ToolbarButton } from './toolbar';

export const TableOfContents = () =>
  createNode(TableOfContentsNode, {
    toolbar: ToolbarButton,
    translations: {
      en: {
        'table-of-contents.title': 'Table of contents',
        'table-of-contents-button.text': 'Add table of contents',
        'voice-command.add-table-of-contents': 'add table of contents',
        'voice-command.remove-table-of-contents': 'remove table of contents',
      },
      lt: {
        'table-of-contents.title': 'Turinys',
        'table-of-contents-button.text': 'Pridėti turinį',
        'voice-command.add-table-of-contents': 'pridėti turinį',
        'voice-command.remove-table-of-contents': 'iššimti turinį',
      },
    },
  });
