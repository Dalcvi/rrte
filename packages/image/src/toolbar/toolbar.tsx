import type { InputIconButtonConfig, RegularButtonConfig } from '@rrte/common';
import { extractImageInfo } from '../image.utils';
import { ImageNode } from '../node';
import { ExtensionControlledUploadConfig, UserControlledUploadConfig } from '../upload-config';
import ImageIcon from './image.icon.svg';
import { createTempImage, handleFileImage } from './toolbar.utils';

export const ExtensionControlledToolbarButton: InputIconButtonConfig<ExtensionControlledUploadConfig> =
  {
    name: ImageNode.name,
    text: 'image-button.text',
    type: 'input-icon' as const,
    priority: 1,
    Icon: ({ className }) => <ImageIcon className={className} width={'15px'} height={'15px'} />,
    getIsDisabled: ({ editor }) =>
      !editor.can().setImage({ src: '', originalHeight: 0, originalWidth: 0 }),
    onChange: async (e, { editor, config }) => {
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }
      const { originalWidth, originalHeight, src } = await extractImageInfo(file);
      const tempImgId = await createTempImage(editor, {
        src,
        originalWidth,
        originalHeight,
      });

      const finalImg = await config.onImageAdd(file, {
        src,
        originalWidth,
        originalHeight,
      });

      await handleFileImage(finalImg, editor, tempImgId);
    },
    getAcceptableFiles: ({ config }) => config.acceptedImageFileTypes.join(', '),
    iconStyling: 'fill',
    group: {
      name: 'media',
      text: 'media-group.text',
      priority: 3,
      toolbar: 'footer',
    },
  };

export const UserControlledToolbarButton: RegularButtonConfig<UserControlledUploadConfig> = {
  name: ImageNode.name,
  text: 'image-button.text',
  type: 'icon' as const,
  priority: 1,
  Icon: ({ className }) => <ImageIcon className={className} width={'15px'} height={'15px'} />,
  getIsDisabled: ({ editor }) =>
    !editor.can().setImage({ src: '', originalHeight: 0, originalWidth: 0 }),
  onClick: async ({ editor, config }) => {
    const uploadValue = await config.onImageAddClick();
    const tempImgId = await createTempImage(editor, uploadValue.tempFile);
    const finalFile = await uploadValue.finalFile;
    await handleFileImage(finalFile, editor, tempImgId);
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
