import { ParagraphNode } from './node';
import { DropdownConfig, ToolbarItemType, createNode } from '@rrte/common';
import classes from './paragraph.module.scss';

export const Paragraph = () =>
  createNode(ParagraphNode, {
    toolbar: toolbarDropdown,
    translations: {
      en: {
        'text-styles-dropdown.text': 'Text styles',
        'paragraph-option': 'Paragraph',
        'voice-command.set-paragraph': 'set paragraph',
        'voice-command.create-near-paragraph': 'create paragraph near',
      },
      lt: {
        'text-styles-dropdown.text': 'Teksto stiliai',
        'paragraph-option': 'Paragrafas',
        'voice-command.set-paragraph': 'nustatyti paragrafą',
        'voice-command.create-near-paragraph': 'sukurti paragrafą šalia',
      },
    },
  });

const toolbarDropdown: DropdownConfig = {
  name: 'text type',
  type: ToolbarItemType.DROPDOWN,
  text: 'text-styles-dropdown.text',
  priority: 105,
  DropdownPriority: 1000,
  values: [
    {
      name: 'Paragraph',
      priority: 0,
      onClick: ({ editor }) => {
        editor.chain().focus().setParagraph().run();
      },
      className: classes.toolbarItem,
      isActive: ({ editor }) => {
        return editor.isActive(ParagraphNode.name);
      },
      text: 'paragraph-option',
    },
  ],
};
