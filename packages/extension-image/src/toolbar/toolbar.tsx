import type { RegularButtonConfig } from '@rrte/common';
import ImageIcon from './image.icon.svg';
import { ImageNode } from '../node';
import { Editor } from '@tiptap/core';
import classNames from 'classnames';
import classes from './toolbar.module.scss';
import { ExtensionControlledUploadConfig, UploadConfig, UserControlledUploadConfig } from '../upload-config';
import { createTempImage, handleFileImage } from './toolbar.utils';

const Button = ({ editor, config }: { editor: Editor; config: UploadConfig }) => {
  if (config.type === 'user-controlled') {
    return <UserControlledButton editor={editor} config={config} />;
  }
  return <ExtensionControlledButton editor={editor} config={config} />;
};

const ExtensionControlledButton = ({ editor, config }: { editor: Editor; config: ExtensionControlledUploadConfig }) => {
  return (
    <div
      className={classNames(classes.imageButton, {
        [classes.disabledButton]: !editor.can().setImage({ src: '', originalHeight: 0, originalWidth: 0 }),
      })}
    >
      <input
        type="file"
        disabled={!editor.can().setImage({ src: '', originalHeight: 0, originalWidth: 0 })}
        accept={config.acceptedImageFileTypes.join(', ')}
        className={classes.imageInput}
        value={''}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) {
            return;
          }
          const reader = new FileReader();
          reader.readAsDataURL(file);

          const image = new Image();
          reader.onload = (e) => {
            if (!e.target || !e.target.result) {
              return;
            }
            const result = e.target.result;
            if (typeof result === 'string') {
              image.src = result;
            } else {
              const blob = new Blob([result], { type: file.type });
              image.src = URL.createObjectURL(blob);
            }
            image.onload = async () => {
              const originalWidth = image.naturalWidth;
              const originalHeight = image.naturalHeight;
              const tempImgId = await createTempImage(editor, {
                src: image.src,
                originalWidth,
                originalHeight,
              });

              const finalImg = await config.onImageAdd(file, {
                src: image.src,
                originalWidth,
                originalHeight,
              });
              await handleFileImage(finalImg, editor, tempImgId);
            };
          };
        }}
      />
      <ImageIcon width={'15px'} height={'15px'} />
    </div>
  );
};

const UserControlledButton = ({ editor, config }: { editor: Editor; config: UserControlledUploadConfig }) => {
  return (
    <button
      data-hook="user-controlled-image-button"
      disabled={!editor.can().setImage({ src: '', originalHeight: 0, originalWidth: 0 })}
      className={classNames(classes.imageButton)}
      onClick={async () => {
        const uploadValue = await config.onImageAddClick();
        const tempImgId = await createTempImage(editor, uploadValue.tempFile);
        await handleFileImage(await uploadValue.finalFile, editor, tempImgId);
      }}
    >
      <ImageIcon width={'15px'} height={'15px'} />
    </button>
  );
};

export const ToolbarButton: RegularButtonConfig<UploadConfig> = {
  Button,
  name: ImageNode.name,
  text: 'Image',
  type: 'icon' as const,
  priority: 1,
};
