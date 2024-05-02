import type { RegularButtonConfig } from '@rrte/common';
import { TableOfContentsNode } from '../node';
import TableOfContentsIcon from './table-of-contents.icon.svg';

export const ToolbarButton: RegularButtonConfig = {
  name: TableOfContentsNode.name,
  text: 'table-of-contents-button.text',
  type: 'icon' as const,
  priority: 96,
  getIsActive: () => false,
  Icon: ({ className }) => (
    <TableOfContentsIcon height={'15px'} width={'15px'} className={className} />
  ),
  onClick: ({ editor }) => {
    const isActive = editor.isActive(TableOfContentsNode.name);
    if (isActive) {
      editor.chain().focus().removeTableOfContents().run();
    }
    editor.chain().focus().setTableOfContents().run();
  },
  getIsDisabled: ({ editor }) => !editor.can().setTableOfContents(),
  iconStyling: 'fill',
  group: {
    name: 'media',
    text: 'media-group.text',
    priority: 3,
    toolbar: 'footer',
  },
};
