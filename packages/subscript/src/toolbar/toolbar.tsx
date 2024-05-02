import type { RegularButtonConfig } from '@rrte/common';
import { SubscriptMark } from '../mark';
import SubscriptIcon from './subscript.icon.svg';

export const ToolbarButton: RegularButtonConfig = {
  name: SubscriptMark.name,
  text: 'subscript-button.text',
  type: 'icon' as const,
  priority: 93,
  getIsActive: ({ editor }) => editor.isActive('subscript'),
  Icon: ({ className }) => <SubscriptIcon height={'15px'} width={'15px'} className={className} />,
  onClick: ({ editor }) => editor.chain().focus().toggleSubscript().run(),
  getIsDisabled: ({ editor }) => !editor.can().toggleSubscript(),
  iconStyling: 'fill',
  group: {
    name: 'text-styling',
    text: 'text-styling-group.text',
    priority: 3,
    toolbar: 'main',
  },
};
