import type { RegularButtonConfig } from '@rrte/common';
import { StrikeMark } from '../mark';
import StrikeIcon from './strike.icon.svg';

export const ToolbarButton: RegularButtonConfig = {
  name: StrikeMark.name,
  text: 'strike-button.text',
  type: 'icon' as const,
  priority: 96,
  getIsActive: ({ editor }) => editor.isActive('strike'),
  getIsDisabled: ({ editor }) => !editor.can().toggleStrike(),
  iconStyling: 'fill',
  Icon: ({ className }) => <StrikeIcon height={'15px'} width={'15px'} className={className} />,
  onClick: ({ editor }) => editor.chain().focus().toggleStrike().run(),
  group: {
    name: 'text-styling',
    text: 'text-styling-group.text',
    priority: 3,
    toolbar: 'main',
  },
};
