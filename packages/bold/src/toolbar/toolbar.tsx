import type { RegularButtonConfig } from '@rrte/common';
import { BoldMark } from '../mark';
import BoldIcon from './bold.icon.svg';

export const ToolbarButton: RegularButtonConfig = {
  name: BoldMark.name,
  text: 'bold-button.text',
  type: 'icon' as const,
  priority: 98,
  Icon: ({ className }) => <BoldIcon height={'15px'} width={'15px'} className={className} />,
  getIsActive: ({ editor }) => editor.isActive('bold'),
  getIsDisabled: ({ editor }) => !editor.can().toggleBold(),
  onClick: ({ editor }) => editor.chain().focus().toggleBold().run(),
  iconStyling: 'fill',
  group: {
    name: 'text-styling',
    text: 'text-styling-group.text',
    priority: 3,
    toolbar: 'main',
  },
};
