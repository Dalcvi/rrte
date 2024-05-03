import type { BubbleMenuToolbar, InputIconButtonParams } from '@rrte/common';
import {
  BubbleMenuWrapper,
  InputIconButton,
  NumberInput,
  RegularButton,
  TextInput,
} from '@rrte/toolbar';
import { useEffect, useRef, useState } from 'react';
import { ImageAttributes, ImageNode } from '../node';
import {
  ExtensionControlledUploadConfig,
  UploadConfig,
  UserControlledUploadConfig,
} from '../upload-config';
import AccessibilityIcon from './accessibility.icon.svg';
import AlignCenter from './align-center.icon.svg';
import AlignLeft from './align-left.icon.svg';
import AlignRight from './align-right.icon.svg';
import BackIcon from './back.icon.svg';
import CustomSize from './custom-size.icon.svg';
import classes from './image-bubble-menu.module.scss';
import ReplaceIcon from './replace.icon.svg';
import { handleFileImage } from './toolbar.utils';

const BubbleMenu: BubbleMenuToolbar<UploadConfig>['Menu'] = ({ editor, config, t }) => {
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const shouldFocusAccessibilityIcon = useRef(false);
  const [accessibilityButton, setAccessibilityButton] = useState<HTMLButtonElement | null>(null);
  const currentAttributes = editor.getAttributes(ImageNode.name) as ImageAttributes & {
    id: string | undefined;
  };
  const [firstBubbleMenuItem, setFirstBubbleMenuItem] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (shouldFocusAccessibilityIcon.current && accessibilityButton) {
      accessibilityButton.focus();
      shouldFocusAccessibilityIcon.current = false;
    }
  }, [accessibilityButton, shouldFocusAccessibilityIcon.current]);

  const imgId = currentAttributes.id;
  if (!imgId) {
    return <></>;
  }
  const isCustomSizeEnabled = !!currentAttributes.customSize;
  const alignment = currentAttributes.alignment;

  if (accessibilityMode) {
    return (
      <BubbleMenuWrapper firstChild={firstBubbleMenuItem}>
        <div className={classes.bubbleMenu}>
          <div className={classes.row}>
            <RegularButton
              ref={setFirstBubbleMenuItem}
              Icon={({ className }) => (
                <BackIcon className={className} height="15px" width="15px" />
              )}
              text={'gif.back'}
              getIsActive={() => false}
              getIsDisabled={() => false}
              iconStyling="stroke"
              onClick={() => {
                shouldFocusAccessibilityIcon.current = true;
                setAccessibilityMode(false);
              }}
              editor={editor}
              config={config}
            />
          </div>
          <hr className={classes.divider} />
          <div className={classes.row}>
            <TextInput
              label={t('image.alt')}
              value={currentAttributes.alt ?? ''}
              onChange={value => editor.commands.updateAttributes(ImageNode.name, { alt: value })}
            />
          </div>
          <hr className={classes.divider} />
          <div className={classes.row}>
            <TextInput
              label={t('image.caption')}
              value={currentAttributes.caption ?? ''}
              onChange={value =>
                editor.commands.updateAttributes(ImageNode.name, { caption: value })
              }
            />
          </div>
        </div>
      </BubbleMenuWrapper>
    );
  }

  const replaceButton =
    config.type === 'user-controlled' ? (
      <RegularButton
        ref={setFirstBubbleMenuItem}
        Icon={({ className }) => <ReplaceIcon className={className} height="15px" width="15px" />}
        text="image-change.text"
        getIsActive={() => false}
        getIsDisabled={() => false}
        iconStyling="stroke"
        onClick={async () => {
          await userControlledOnChange(config, editor, imgId);
        }}
        editor={editor}
        config={config}
      />
    ) : (
      <InputIconButton
        ref={setFirstBubbleMenuItem}
        text="image-change.text"
        Icon={({ className }) => <ReplaceIcon className={className} height="15px" width="15px" />}
        editor={editor}
        config={config}
        iconStyling="stroke"
        getIsDisabled={() => false}
        getAcceptableFiles={() => config.acceptedImageFileTypes.join(', ')}
        onChange={async e => {
          await extensionControlledOnChange(e, config, editor, imgId);
        }}
      />
    );

  return (
    <BubbleMenuWrapper firstChild={firstBubbleMenuItem}>
      <div className={classes.bubbleMenu}>
        <div className={classes.row}>
          {replaceButton}
          <RegularButton
            Icon={({ className }) => <AlignLeft className={className} height="15px" width="15px" />}
            text={'image.align-left'}
            getIsActive={() => alignment === 'left'}
            getIsDisabled={() => false}
            iconStyling="stroke"
            onClick={() => {
              editor.commands.updateAttributes(ImageNode.name, { alignment: 'left' });
            }}
            editor={editor}
            config={config}
          />
          <RegularButton
            Icon={({ className }) => (
              <AlignCenter className={className} height="15px" width="15px" />
            )}
            text={'image.align-center'}
            getIsActive={() => alignment === 'center'}
            getIsDisabled={() => false}
            iconStyling="stroke"
            onClick={() => {
              editor.commands.updateAttributes(ImageNode.name, { alignment: 'center' });
            }}
            editor={editor}
            config={config}
          />
          <RegularButton
            Icon={({ className }) => (
              <AlignRight className={className} height="15px" width="15px" />
            )}
            text={'image.align-right'}
            getIsActive={() => alignment === 'right'}
            getIsDisabled={() => false}
            iconStyling="stroke"
            onClick={() => {
              editor.commands.updateAttributes(ImageNode.name, { alignment: 'right' });
            }}
            editor={editor}
            config={config}
          />
          <RegularButton
            Icon={({ className }) => (
              <AccessibilityIcon className={className} height="15px" width="15px" />
            )}
            text={'image.accessibility'}
            getIsActive={() => false}
            ref={setAccessibilityButton}
            getIsDisabled={() => false}
            iconStyling="fill"
            onClick={() => {
              setAccessibilityMode(true);
            }}
            editor={editor}
            config={config}
          />
          <RegularButton
            Icon={({ className }) => (
              <CustomSize className={className} height="15px" width="15px" />
            )}
            text={'image.align-size'}
            getIsActive={() => isCustomSizeEnabled}
            getIsDisabled={() => false}
            iconStyling="fill"
            onClick={() => {
              editor.commands.updateAttributes(ImageNode.name, {
                customSize: !isCustomSizeEnabled,
              });
            }}
            editor={editor}
            config={config}
          />
        </div>
        <hr className={classes.divider} />
        <div className={classes.row}>
          <NumberInput
            label={t('image.width')}
            value={
              currentAttributes.customWidth === null
                ? currentAttributes.originalWidth
                : currentAttributes.customWidth
            }
            isDisabled={!isCustomSizeEnabled}
            onChange={value =>
              editor.commands.updateAttributes(ImageNode.name, { customWidth: value })
            }
          />
          <NumberInput
            label={t('image.height')}
            value={
              currentAttributes.customHeight === null
                ? currentAttributes.originalHeight
                : currentAttributes.customHeight
            }
            isDisabled={!isCustomSizeEnabled}
            onChange={value =>
              editor.commands.updateAttributes(ImageNode.name, { customHeight: value })
            }
          />
        </div>
      </div>
    </BubbleMenuWrapper>
  );
};

const userControlledOnChange = async (
  config: UserControlledUploadConfig,
  editor: InputIconButtonParams<UserControlledUploadConfig>['editor'],
  imgId: string
) => {
  const uploadValue = await config.onImageAddClick();
  await handleFileImage(uploadValue.tempFile, editor, imgId, true);
  await handleFileImage(await uploadValue.finalFile, editor, imgId);
};

const extensionControlledOnChange = async (
  e: React.ChangeEvent<HTMLInputElement>,
  config: ExtensionControlledUploadConfig,
  editor: InputIconButtonParams<ExtensionControlledUploadConfig>['editor'],
  imgId: string
) => {
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
};

export const ImageBubbleMenu: BubbleMenuToolbar<UploadConfig> = {
  Menu: BubbleMenu,
  shouldShow: ({ editor }) => {
    return editor.isActive(ImageNode.name) && !editor.getAttributes(ImageNode.name).isLoading;
  },
};
