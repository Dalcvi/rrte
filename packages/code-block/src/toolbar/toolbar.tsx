import type { RegularButtonConfig } from '@rrte/common';
import { CodeBlockNode } from '../node';
import CodeblockIcon from './codeblock.icon.svg';

export const ToolbarButton: RegularButtonConfig = {
  name: CodeBlockNode.name,
  text: 'codeblock-button.text',
  type: 'icon' as const,
  priority: 87,
  getIsActive: ({ editor }) => editor.isActive(CodeBlockNode.name),
  getIsDisabled: ({ editor }) => !editor.can().toggleCodeBlock(),
  iconStyling: 'fill',
  onClick: ({ editor }) => editor.chain().focus().toggleCodeBlock().run(),
  Icon: ({ className }) => <CodeblockIcon height={'15px'} width={'15px'} className={className} />,
  group: {
    name: 'text-styling',
    text: 'text-styling-group.text',
    priority: 3,
    toolbar: 'main',
  },
};
