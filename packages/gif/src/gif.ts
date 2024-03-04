import { createNode } from '@rrte/common';
import { GifNode } from './node';
import { GifBubbleMenu, ToolbarButton } from './toolbar';

export const Gif = (sdkKey: string) =>
  createNode(GifNode, {
    toolbar: ToolbarButton,
    bubbleMenu: GifBubbleMenu,
    sdkKey,
  });
