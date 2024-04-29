import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { TableOfContents } from './table-of-contents.component';
import { name as headingName } from '@rrte/heading';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tableOfContents: {
      /**
       * Set a content list
       */
      setTableOfContents: () => ReturnType;
      /**
       * Remove a content list
       */
      removeTableOfContents: () => ReturnType;
    };
  }
}

export const TableOfContentsNode = Node.create({
  name: 'tableOfContents',

  group: 'block',

  atom: true,

  selectable: true,

  draggable: true,

  parseHTML() {
    return [
      {
        tag: 'nav',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['nav', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TableOfContents);
  },

  speechCommands: t => [
    {
      group: t('voice-group.document-formatting'),
      activationKeyword: t('voice-command.add-table-of-contents'),
      command: 'setTableOfContents',
      description: 'Set a table of contents',
    },
    {
      group: t('voice-group.document-formatting'),
      activationKeyword: t('voice-command.remove-table-of-contents'),
      command: 'removeTableOfContents',
      description: 'Remove a table of contents',
    },
  ],

  addCommands() {
    return {
      setTableOfContents:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
          });
        },
      removeTableOfContents:
        () =>
        ({ commands }) => {
          return commands.deleteNode(this.name);
        },
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: [headingName],
        attributes: {
          id: {
            default: null,
          },
        },
      },
    ];
  },
});
