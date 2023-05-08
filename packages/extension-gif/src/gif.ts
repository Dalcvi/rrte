import { createExtension } from '@rrte/common';
import { GifNode } from './node';
import { GifBubbleMenu, ToolbarButton } from './toolbar';

export const Gif = (sdkKey: string) =>
  createExtension(GifNode, {
    toolbar: ToolbarButton,
    bubbleMenu: GifBubbleMenu,
    sdkKey,
  });
