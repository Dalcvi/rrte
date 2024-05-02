import type { RegularButtonConfig } from '@rrte/common';
import type {} from '@rrte/paragraph';
import { BlockquoteNode } from '../node';
import BlockquoteIcon from './blockquote.icon.svg';

export const ToolbarButton: RegularButtonConfig = {
  name: BlockquoteNode.name,
  text: 'blockquote-button.text',
  type: 'icon' as const,
  priority: 88,
  getIsActive: ({ editor }) => editor.isActive(BlockquoteNode.name),
  getIsDisabled: ({ editor }) => !editor.can().toggleBlockquote(),
  iconStyling: 'fill',
  onClick: ({ editor }) => editor.chain().focus().setParagraph().toggleBlockquote().run(),
  Icon: ({ className }) => <BlockquoteIcon height={'15px'} width={'15px'} className={className} />,
  group: {
    name: 'text-styling',
    text: 'text-styling-group.text',
    priority: 3,
    toolbar: 'main',
  },
};
