import type { RegularButtonConfig } from '@rrte/common';
import { SuperscriptMark } from '../mark';
import SuperscriptIcon from './superscript.icon.svg';

export const ToolbarButton: RegularButtonConfig = {
  name: SuperscriptMark.name,
  text: 'superscript-button.text',
  type: 'icon' as const,
  priority: 94,
  getIsActive: ({ editor }) => editor.isActive('superscript'),
  Icon: ({ className }) => <SuperscriptIcon height={'15px'} width={'15px'} className={className} />,
  onClick: ({ editor }) => editor.chain().focus().toggleSuperscript().run(),
  getIsDisabled: ({ editor }) => !editor.can().toggleSuperscript(),
  iconStyling: 'fill',
  group: {
    name: 'text-styling',
    text: 'text-styling-group.text',
    priority: 3,
    toolbar: 'main',
  },
};
