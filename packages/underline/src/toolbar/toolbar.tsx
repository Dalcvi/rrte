import type { RegularButtonConfig } from '@rrte/common';
import { UnderlineMark } from '../mark';
import UnderlineIcon from './underline.icon.svg';

export const ToolbarButton: RegularButtonConfig = {
  name: UnderlineMark.name,
  text: 'underline-button.text',
  type: 'icon' as const,
  priority: 95,
  getIsActive: ({ editor }) => editor.isActive('underline'),
  Icon: ({ className }) => <UnderlineIcon height={'15px'} width={'15px'} className={className} />,
  onClick: ({ editor }) => editor.chain().focus().toggleUnderline().run(),
  getIsDisabled: ({ editor }) => !editor.can().toggleUnderline(),
  iconStyling: 'fill',
  group: {
    name: 'text-styling',
    text: 'text-styling-group.text',
    priority: 3,
    toolbar: 'main',
  },
};
