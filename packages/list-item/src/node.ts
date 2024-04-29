import { mergeAttributes, Node } from '@tiptap/core';

export interface ListItemOptions {
  HTMLAttributes: Record<string, any>;
}

export const ListItemNode = Node.create<ListItemOptions>({
  name: 'listItem',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  content: 'paragraph block*',

  defining: true,

  speechCommands: t => [
    {
      group: t('voice-group.text-formatting'),
      activationKeyword: t('voice-command.split-list-item'),
      command: 'splitListItem',
      description: 'Set a list item',
    },
    {
      group: t('voice-group.text-formatting'),
      activationKeyword: t('voice-command.sink-list-item'),
      command: 'sinkListItem',
      description: 'Sink a list item',
    },
    {
      group: t('voice-group.text-formatting'),
      activationKeyword: t('voice-command.lift-list-item'),
      command: 'liftListItem',
      description: 'Lift a list item',
    },
  ],

  parseHTML() {
    return [
      {
        tag: 'li',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['li', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      'Shift-Tab': () => this.editor.commands.liftListItem(this.name),
    };
  },
});
