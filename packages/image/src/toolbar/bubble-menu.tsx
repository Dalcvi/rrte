import type { BubbleMenuToolbar } from '@rrte/common';
import { Editor } from '@tiptap/core';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { ImageAttributes, ImageNode } from '../node';
import {
  ExtensionControlledUploadConfig,
  UploadConfig,
  UserControlledUploadConfig,
} from '../upload-config';
import AlignCenter from './align-center.icon.svg';
import AlignLeft from './align-left.icon.svg';
import AlignRight from './align-right.icon.svg';
import CustomSize from './custom-size.icon.svg';
import classes from './image-bubble-menu.module.scss';
import ReplaceIcon from './replace.icon.svg';
import { handleFileImage } from './toolbar.utils';

const BubbleMenu: BubbleMenuToolbar<UploadConfig>['Menu'] = ({ editor, config, t }) => {
  const [maxWidth, setMaxWidth] = useState(0);
  const currentAttributes = editor.getAttributes(ImageNode.name) as ImageAttributes & {
    id: string | undefined;
  };

  useEffect(() => {
    const editor = document.querySelector("[data-testid='rrte-editor']") as HTMLElement;
    if (!editor) {
      return;
    }
    const observer = new ResizeObserver(entries => {
      const maxWidth = entries[0].contentRect.width;
      setMaxWidth(maxWidth);
    });
    observer.observe(editor);

    return () => {
      observer.disconnect();
    };
  }, []);

  const imgId = currentAttributes.id;
  if (!imgId) {
    return <></>;
  }
  const isCustomSizeEnabled = !!currentAttributes.customSize;
  const alignment = currentAttributes.alignment;
  return (
    <div className={classes.bubbleMenu} style={{ maxWidth: `${maxWidth}px` }}>
      <ChangeImageButton config={config} editor={editor} imgId={imgId} t={t} />
      <button
        data-testid="image-bubble-menu-align-left"
        aria-label={t('image.align-left')}
        className={classNames(classes.button, {
          [classes.buttonActive]: alignment === 'left',
        })}
        onClick={() => {
          editor.commands.updateAttributes(ImageNode.name, { alignment: 'left' });
        }}
      >
        <AlignLeft
          width="20px"
          height="20px"
          className={classNames(classes.icon, {
            [classes.active]: alignment === 'left',
          })}
        />
      </button>
      <button
        aria-label={t('image.align-center')}
        data-testid="image-bubble-menu-align-center"
        className={classNames(classes.button, {
          [classes.buttonActive]: alignment === 'center',
        })}
        onClick={() => {
          editor.commands.updateAttributes(ImageNode.name, { alignment: 'center' });
        }}
      >
        <AlignCenter
          width="20px"
          height="20px"
          className={classNames(classes.icon, {
            [classes.active]: alignment === 'center',
          })}
        />
      </button>
      <button
        aria-label={t('image.align-right')}
        data-testid="image-bubble-menu-align-right"
        className={classNames(classes.button, {
          [classes.buttonActive]: alignment === 'right',
        })}
        onClick={() => {
          editor.commands.updateAttributes(ImageNode.name, { alignment: 'right' });
        }}
      >
        <AlignRight
          width="20px"
          height="20px"
          className={classNames(classes.icon, {
            [classes.active]: alignment === 'right',
          })}
        />
      </button>
      <button
        aria-label={t('image.custom-size')}
        data-testid="image-bubble-menu-custom-size"
        className={classNames(classes.button, {
          [classes.buttonActive]: isCustomSizeEnabled,
        })}
        onClick={() => {
          editor.commands.updateAttributes(ImageNode.name, { customSize: !isCustomSizeEnabled });
        }}
      >
        <CustomSize
          width="20px"
          height="20px"
          className={classNames(classes.icon, {
            [classes.active]: isCustomSizeEnabled,
          })}
        />
      </button>
      <label className={classes.inputContainer}>
        {t('image.alt')}
        <input
          aria-label="image alt"
          data-testid="image-bubble-menu-input-alt"
          className={classes.inputField}
          type="text"
          value={currentAttributes.alt ?? undefined}
          onChange={e => editor.commands.updateAttributes(ImageNode.name, { alt: e.target.value })}
        />
      </label>
      <label className={classes.inputContainer}>
        {t('image.width')}
        <input
          aria-label="image width"
          data-testid="image-bubble-menu-input-width"
          disabled={!isCustomSizeEnabled}
          className={classes.inputField}
          type="number"
          value={
            currentAttributes.customWidth === null
              ? currentAttributes.originalWidth
              : currentAttributes.customWidth
          }
          onChange={e =>
            editor.commands.updateAttributes(ImageNode.name, {
              customWidth: Number(e.target.value),
            })
          }
        />
      </label>
      <label className={classes.inputContainer}>
        {t('image.height')}
        <input
          aria-label="image height"
          data-testid="image-bubble-menu-input-height"
          disabled={!isCustomSizeEnabled}
          className={classes.inputField}
          type="number"
          value={
            currentAttributes.customHeight === null
              ? currentAttributes.originalHeight
              : currentAttributes.customHeight
          }
          onChange={e =>
            editor.commands.updateAttributes(ImageNode.name, {
              customHeight: Number(e.target.value),
            })
          }
        />
      </label>
    </div>
  );
};

const ChangeImageButton = ({
  editor,
  config,
  imgId,
  t,
}: {
  editor: Editor;
  config: UploadConfig;
  imgId: string;
  t: (key: string) => string;
}) => {
  if (config.type === 'user-controlled') {
    return <UserControlledChangeButton editor={editor} config={config} imgId={imgId} t={t} />;
  }

  return <ExtensionControlledChangeButton editor={editor} config={config} imgId={imgId} t={t} />;
};

const ExtensionControlledChangeButton = ({
  editor,
  config,
  imgId,
  t,
}: {
  editor: Editor;
  config: ExtensionControlledUploadConfig;
  imgId: string;
  t: (key: string) => string;
}) => {
  return (
    <div className={classes.button}>
      <input
        aria-label={t('image-change.text')}
        type="file"
        accept={config.acceptedImageFileTypes.join(', ')}
        className={classes.imageInput}
        value={''}
        onChange={async e => {
          const file = e.target.files?.[0];
          if (!file) {
            return;
          }
          const reader = new FileReader();
          reader.readAsDataURL(file);

          const image = new Image();
          reader.onload = e => {
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
              await handleFileImage(
                {
                  src: image.src,
                  originalWidth,
                  originalHeight,
                },
                editor,
                imgId,
                true
              );

              const finalImg = await config.onImageAdd(file, {
                src: image.src,
                originalWidth,
                originalHeight,
              });
              await handleFileImage(finalImg, editor, imgId);
            };
          };
        }}
      />
      <ReplaceIcon className={classes.icon} width={'15px'} height={'15px'} />
    </div>
  );
};

const UserControlledChangeButton = ({
  editor,
  config,
  imgId,
  t,
}: {
  editor: Editor;
  config: UserControlledUploadConfig;
  imgId: string;
  t: (key: string) => string;
}) => {
  return (
    <button
      aria-label={t('image-change.text')}
      data-testid="user-controlled-image-button"
      className={classNames(classes.button)}
      onClick={async () => {
        const uploadValue = await config.onImageAddClick();
        await handleFileImage(uploadValue.tempFile, editor, imgId, true);
        await handleFileImage(await uploadValue.finalFile, editor, imgId);
      }}
    >
      <ReplaceIcon className={classes.icon} width={'15px'} height={'15px'} />
    </button>
  );
};

export const ImageBubbleMenu: BubbleMenuToolbar<UploadConfig> = {
  Menu: BubbleMenu,
  shouldShow: ({ editor }) => {
    return editor.isActive(ImageNode.name) && !editor.getAttributes(ImageNode.name).isLoading;
  },
};
