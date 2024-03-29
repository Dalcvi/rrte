import { createNode } from '@rrte/common';
import { YoutubeNode } from './node';
import { YoutubeBubbleMenu, ToolbarButton } from './toolbar';

export const Youtube = () =>
  createNode(YoutubeNode, {
    toolbar: ToolbarButton,
    bubbleMenu: YoutubeBubbleMenu,
  });
