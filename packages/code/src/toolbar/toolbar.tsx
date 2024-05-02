import type { RegularButtonConfig } from '@rrte/common';
import { CodeMark } from '../mark';
import CodeIcon from './code.icon.svg';

export const ToolbarButton: RegularButtonConfig = {
  name: CodeMark.name,
  text: 'code-button.text',
  type: 'icon' as const,
  priority: 86,
  getIsActive: ({ editor }) => editor.isActive(CodeMark.name),
  getIsDisabled: ({ editor }) => !editor.can().toggleCode(),
  iconStyling: 'fill',
  onClick: ({ editor }) => editor.chain().focus().toggleCode().run(),
  Icon: ({ className }) => <CodeIcon height={'15px'} width={'15px'} className={className} />,
  group: {
    name: 'text-styling',
    text: 'text-styling-group.text',
    priority: 3,
    toolbar: 'main',
  },
};
