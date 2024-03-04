import { createNode } from '@rrte/common';
import { ImageNode } from './node';
import { ImageBubbleMenu, ToolbarButton } from './toolbar';
import { UploadConfig } from './upload-config';

export const Image = (uploadConfig: UploadConfig) =>
  createNode(ImageNode, {
    toolbar: ToolbarButton,
    bubbleMenu: ImageBubbleMenu,
    ...uploadConfig,
  });
