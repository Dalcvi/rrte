import { createExtension } from '@rrte/common';
import { ImageNode } from './node';
import { ImageBubbleMenu, ToolbarButton } from './toolbar';
import { UploadConfig } from './upload-config';

export const Image = (uploadConfig: UploadConfig) =>
  createExtension(ImageNode, {
    toolbar: ToolbarButton,
    bubbleMenu: ImageBubbleMenu,
    ...uploadConfig,
  }).extend({
    addOptions() {
      return {
        ...this.parent?.(),
        upload:
          uploadConfig.type === 'user-controlled' ? uploadConfig.onPaste : uploadConfig.onImageAdd,
        maxFileSize: uploadConfig.maxFileSize,
        acceptedImageFileTypes: uploadConfig.acceptedImageFileTypes,
      };
    },
  });
