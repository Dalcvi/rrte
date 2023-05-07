import { createExtension } from '@rrte/common';
import { YoutubeNode } from './node';
import { YoutubeBubbleMenu, ToolbarButton } from './toolbar';

export const Youtube = () =>
  createExtension(YoutubeNode, {
    toolbar: ToolbarButton,
    bubbleMenu: YoutubeBubbleMenu,
  });
