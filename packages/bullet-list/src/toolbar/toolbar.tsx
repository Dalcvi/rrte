import type { RegularButtonConfig } from '@rrte/common';
import { BulletListNode } from '../node';
import BulletListIcon from './bulletlist.icon.svg';

export const ToolbarButton: RegularButtonConfig = {
  name: BulletListNode.name,
  text: 'bullet-list-button.text',
  type: 'icon' as const,
  priority: 82,
  getIsActive: ({ editor }) => editor.isActive(BulletListNode.name),
  getIsDisabled: ({ editor }) => !editor.can().toggleBulletList(),
  iconStyling: 'fill',
  Icon: ({ className }) => <BulletListIcon height={'15px'} width={'15px'} className={className} />,
  onClick: ({ editor }) => editor.chain().focus().toggleBulletList().run(),
  group: {
    name: 'lists',
    text: 'lists.text',
    priority: 2,
    toolbar: 'main',
  },
};
