import type { RegularButtonConfig } from '@rrte/common';
import { OrderedListNode } from '../node';
import OrderedListIcon from './orderedlist.icon.svg';

export const ToolbarButton: RegularButtonConfig = {
  name: OrderedListNode.name,
  text: 'ordered-list-button.text',
  type: 'icon' as const,
  priority: 80,
  Icon: ({ className }) => <OrderedListIcon height={'15px'} width={'15px'} className={className} />,
  getIsActive: ({ editor }) => editor.isActive(OrderedListNode.name),
  getIsDisabled: ({ editor }) => !editor.can().toggleOrderedList(),
  onClick: ({ editor }) => editor.chain().focus().toggleOrderedList().run(),
  iconStyling: 'fill',
  group: {
    name: 'lists',
    text: 'lists.text',
    priority: 2,
    toolbar: 'main',
  },
};
