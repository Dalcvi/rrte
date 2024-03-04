import { ParagraphNode } from './node';
import { DropdownConfig, ToolbarItemType, createNode } from '@rrte/common';
import classes from './paragraph.module.scss';

export const Paragraph = () =>
  createNode(ParagraphNode, {
    toolbar: toolbarDropdown,
  });

const toolbarDropdown: DropdownConfig = {
  name: 'text type',
  type: ToolbarItemType.DROPDOWN,
  text: 'Text type',
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
      text: 'Paragraph',
    },
  ],
};
