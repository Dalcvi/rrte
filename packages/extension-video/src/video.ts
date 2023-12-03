import { createExtension } from '@rrte/common';
import { VideoNode } from './node';
import { VideoBubbleMenu, ToolbarButton } from './toolbar';
import { UploadConfig } from './upload-config';

export const Video = (uploadConfig: UploadConfig) =>
  createExtension(VideoNode, {
    toolbar: ToolbarButton,
    bubbleMenu: VideoBubbleMenu,
    ...uploadConfig,
  }).extend({
    addOptions() {
      return {
        ...this.parent?.(),
        upload:
          uploadConfig.type === 'user-controlled' ? uploadConfig.onPaste : uploadConfig.onVideoAdd,
        maxFileSize: uploadConfig.maxFileSize,
        acceptedVideoFileTypes: uploadConfig.acceptedVideoFileTypes,
      };
    },
  });
