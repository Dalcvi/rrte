import { createMark } from '@rrte/common';
import { LinkMark } from './mark';
import { LinkBubbleMenu, ToolbarButton } from './toolbar';

export const Link = () =>
  createMark(LinkMark, {
    toolbar: ToolbarButton,
    bubbleMenu: LinkBubbleMenu,
  });
