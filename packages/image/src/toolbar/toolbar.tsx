import type { RegularButtonConfig } from '@rrte/common';
import { Editor } from '@tiptap/core';
import classNames from 'classnames';
import { extractImageInfo } from '../image.utils';
import { ImageNode } from '../node';
import {
  ExtensionControlledUploadConfig,
  UploadConfig,
  UserControlledUploadConfig,
} from '../upload-config';
import ImageIcon from './image.icon.svg';
import classes from './toolbar.module.scss';
import { createTempImage, handleFileImage } from './toolbar.utils';

const Button = ({ editor, config }: { editor: Editor; config: UploadConfig }) => {
  if (config.type === 'user-controlled') {
    return <UserControlledButton editor={editor} config={config} />;
  }
  return <ExtensionControlledButton editor={editor} config={config} />;
};

const ExtensionControlledButton = ({
  editor,
  config,
}: {
  editor: Editor;
  config: ExtensionControlledUploadConfig;
}) => {
  return (
    <div
      className={classNames(classes.imageButton, {
        [classes.disabledButton]: !editor
          .can()
          .setImage({ src: '', originalHeight: 0, originalWidth: 0 }),
      })}
      data-testid="extension-controlled-image-button"
    >
      <input
        data-testid="extension-controlled-input"
        aria-label="image"
        type="file"
        disabled={!editor.can().setImage({ src: '', originalHeight: 0, originalWidth: 0 })}
        accept={config.acceptedImageFileTypes.join(', ')}
        className={classes.imageInput}
        value={''}
        onChange={async e => {
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
        }}
      />
      <ImageIcon className={classes.icon} width={'15px'} height={'15px'} />
    </div>
  );
};

const UserControlledButton = ({
  editor,
  config,
}: {
  editor: Editor;
  config: UserControlledUploadConfig;
}) => {
  return (
    <button
      data-testid="user-controlled-image-button"
      aria-label="add image"
      disabled={!editor.can().setImage({ src: '', originalHeight: 0, originalWidth: 0 })}
      className={classNames(classes.imageButton)}
      onClick={async () => {
        const uploadValue = await config.onImageAddClick();
        const tempImgId = await createTempImage(editor, uploadValue.tempFile);
        const finalFile = await uploadValue.finalFile;
        await handleFileImage(finalFile, editor, tempImgId);
      }}
    >
      <ImageIcon className={classes.icon} width={'15px'} height={'15px'} />
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
