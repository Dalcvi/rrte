import { createExtension } from '@rrte/common';
import { LinkMark } from './mark';
import { LinkBubbleMenu, ToolbarButton } from './toolbar';

export const Link = () =>
  createExtension(LinkMark, {
    toolbar: ToolbarButton,
    bubbleMenu: LinkBubbleMenu,
  });
