import { createNode } from '@rrte/common';
import { VideoNode } from './node';
import { VideoBubbleMenu, ToolbarButton } from './toolbar';
import { UploadConfig } from './upload-config';

export const Video = (uploadConfig: UploadConfig) =>
  createNode(VideoNode, {
    toolbar: ToolbarButton,
    bubbleMenu: VideoBubbleMenu,
    ...uploadConfig,
  });
