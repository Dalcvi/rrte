import type { RegularButtonConfig } from '@rrte/common';
import { TableNode } from '../table.node';
import TableIcon from './table.icon.svg';

export const ToolbarButton: RegularButtonConfig = {
  name: TableNode.name,
  text: 'table-button.text',
  type: 'icon' as const,
  priority: 88,
  getIsActive: ({ editor }) => editor.isActive(TableNode.name),
  Icon: ({ className }) => <TableIcon height={'15px'} width={'15px'} className={className} />,
  onClick: ({ editor }) => editor.commands.insertTable(),
  getIsDisabled: ({ editor }) => !editor.can().insertTable(),
  iconStyling: 'stroke',
  group: {
    name: 'media',
    text: 'media-group.text',
    priority: 3,
    toolbar: 'footer',
  },
};
