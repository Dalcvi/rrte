import type { RegularButtonConfig } from '@rrte/common';
import { ItalicMark } from '../mark';
import ItalicIcon from './italic.icon.svg';

export const ToolbarButton: RegularButtonConfig = {
  name: ItalicMark.name,
  text: 'italic-button.text',
  type: 'icon' as const,
  priority: 97,
  getIsActive: ({ editor }) => editor.isActive('italic'),
  getIsDisabled: ({ editor }) => !editor.can().toggleItalic(),
  iconStyling: 'stroke',
  onClick: ({ editor }) => editor.chain().focus().toggleItalic().run(),
  Icon: ({ className }) => <ItalicIcon height={'15px'} width={'15px'} className={className} />,
  group: {
    name: 'text-styling',
    text: 'text-styling-group.text',
    priority: 3,
    toolbar: 'main',
  },
};
