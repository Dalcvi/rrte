import { ParagraphNode } from './node';
import { ToolbarItemType, createExtension } from '@rrte/common';
import classes from './paragraph.module.scss';

export const Paragraph = () =>
  createExtension(ParagraphNode, {
    toolbar: {
      name: 'text-type',
      type: ToolbarItemType.DROPDOWN,
      text: 'Text type',
      priority: 10,
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
    },
  });
