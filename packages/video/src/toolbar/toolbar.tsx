import type { InputIconButtonConfig, RegularButtonConfig } from '@rrte/common';
import { VideoNode } from '../node';
import { ExtensionControlledUploadConfig, UserControlledUploadConfig } from '../upload-config';
import { createTempVideo, handleFileVideo } from './toolbar.utils';
import VideoIcon from './video.icon.svg';

export const ExtensionControlledToolbarButton: InputIconButtonConfig<ExtensionControlledUploadConfig> =
  {
    name: VideoNode.name,
    text: 'video-button.text',
    type: 'input-icon' as const,
    priority: 1,
    Icon: ({ className }) => <VideoIcon className={className} width={'15px'} height={'15px'} />,
    getIsDisabled: ({ editor }) => !editor.can().setVideo({ src: '' }),
    onChange: async (e, { editor, config }) => {
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async e => {
        if (!e.target || !e.target.result) {
          return;
        }
        const result = e.target.result;
        let src = '';
        if (typeof result === 'string') {
          src = result;
        } else {
          const blob = new Blob([result], { type: file.type });
          src = URL.createObjectURL(blob);
        }
        const tempImgId = await createTempVideo(editor, {
          src,
        });

        const finalImg = await config.onVideoAdd(file, {
          src,
        });
        await handleFileVideo(finalImg, editor, tempImgId);
      };
    },
    getAcceptableFiles: ({ config }) => config.acceptedVideoFileTypes.join(', '),
    iconStyling: 'fill',
    group: {
      name: 'media',
      text: 'media-group.text',
      priority: 3,
      toolbar: 'footer',
    },
  };

export const UserControlledToolbarButton: RegularButtonConfig<UserControlledUploadConfig> = {
  name: VideoNode.name,
  text: 'video-button.text',
  type: 'icon' as const,
  priority: 1,
  Icon: ({ className }) => <VideoIcon className={className} width={'15px'} height={'15px'} />,
  getIsDisabled: ({ editor }) => !editor.can().setVideo({ src: '' }),
  onClick: async ({ editor, config }) => {
    const uploadValue = await config.onVideoAddClick();
    const tempImgId = await createTempVideo(editor, uploadValue.tempFile);
    await handleFileVideo(await uploadValue.finalFile, editor, tempImgId);
  },
  getIsActive: () => false,
  iconStyling: 'fill',
  group: {
    name: 'media',
    text: 'media-group.text',
    priority: 3,
    toolbar: 'footer',
  },
};
