import type { RegularButtonConfig } from '@rrte/common';
import { LinkMark } from '../mark';
import LinkIcon from './link.icon.svg';

export const ToolbarButton: RegularButtonConfig = {
  name: LinkMark.name,
  text: 'link-button.text',
  type: 'icon' as const,
  priority: 85,
  getIsActive: ({ editor }) => editor.isActive(LinkMark.name),
  getIsDisabled: ({ editor }) =>
    !editor.can().toggleLink({
      href: editor.getAttributes(LinkMark.name)?.href ?? '',
    }),
  iconStyling: 'fill',
  onClick: ({ editor }) =>
    editor
      .chain()
      .focus()
      .toggleLink({ href: editor.getAttributes(LinkMark.name)?.href ?? '' })
      .run(),
  Icon: ({ className }) => <LinkIcon height={'15px'} width={'15px'} className={className} />,
  group: {
    name: 'text-styling',
    text: 'text-styling-group.text',
    priority: 3,
    toolbar: 'main',
  },
};
