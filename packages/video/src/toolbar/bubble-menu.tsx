import type { BubbleMenuToolbar, InputIconButtonParams } from '@rrte/common';
import {
  BubbleMenuWrapper,
  InputIconButton,
  NumberInput,
  RegularButton,
  TextInput,
} from '@rrte/toolbar';
import { useEffect, useRef, useState } from 'react';
import { VideoAttributes, VideoNode } from '../node';
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
import ReplaceIcon from './replace.icon.svg';
import { handleFileVideo } from './toolbar.utils';
import classes from './video-bubble-menu.module.scss';

const BubbleMenu: BubbleMenuToolbar<UploadConfig>['Menu'] = ({ editor, config, t }) => {
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const shouldFocusAccessibilityIcon = useRef(false);
  const [accessibilityButton, setAccessibilityButton] = useState<HTMLButtonElement | null>(null);
  const currentAttributes = editor.getAttributes(VideoNode.name) as VideoAttributes & {
    id: string | undefined;
  };

  useEffect(() => {
    if (shouldFocusAccessibilityIcon.current && accessibilityButton) {
      accessibilityButton.focus();
      shouldFocusAccessibilityIcon.current = false;
    }
  }, [accessibilityButton, shouldFocusAccessibilityIcon.current]);

  const videoId = currentAttributes.id;
  if (!videoId) {
    return <></>;
  }
  const isCustomSizeEnabled = !!currentAttributes.customSize;
  const alignment = currentAttributes.alignment;

  if (accessibilityMode) {
    return (
      <BubbleMenuWrapper>
        <div className={classes.bubbleMenu}>
          <div className={classes.row}>
            <RegularButton
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
              label={t('video.title')}
              value={currentAttributes.title ?? ''}
              onChange={value => editor.commands.updateAttributes(VideoNode.name, { title: value })}
            />
          </div>
        </div>
      </BubbleMenuWrapper>
    );
  }

  return (
    <BubbleMenuWrapper>
      <div className={classes.bubbleMenu}>
        <div className={classes.row}>
          <InputIconButton
            text="video-change.label"
            Icon={({ className }) => (
              <ReplaceIcon className={className} height="15px" width="15px" />
            )}
            editor={editor}
            config={config}
            iconStyling="stroke"
            getIsDisabled={() => false}
            getAcceptableFiles={() => config.acceptedVideoFileTypes.join(', ')}
            onChange={async e => {
              if (config.type === 'user-controlled') {
                await userControlledOnChange(config, editor, videoId);
              } else {
                await extensionControlledOnChange(e, config, editor, videoId);
              }
            }}
          />
          <RegularButton
            Icon={({ className }) => <AlignLeft className={className} height="15px" width="15px" />}
            text={'gif.align-left'}
            getIsActive={() => alignment === 'left'}
            getIsDisabled={() => false}
            iconStyling="stroke"
            onClick={() => {
              editor.commands.updateAttributes(VideoNode.name, { alignment: 'left' });
            }}
            editor={editor}
            config={config}
          />
          <RegularButton
            Icon={({ className }) => (
              <AlignCenter className={className} height="15px" width="15px" />
            )}
            text={'gif.align-center'}
            getIsActive={() => alignment === 'center'}
            getIsDisabled={() => false}
            iconStyling="stroke"
            onClick={() => {
              editor.commands.updateAttributes(VideoNode.name, { alignment: 'center' });
            }}
            editor={editor}
            config={config}
          />
          <RegularButton
            Icon={({ className }) => (
              <AlignRight className={className} height="15px" width="15px" />
            )}
            text={'gif.align-right'}
            getIsActive={() => alignment === 'right'}
            getIsDisabled={() => false}
            iconStyling="stroke"
            onClick={() => {
              editor.commands.updateAttributes(VideoNode.name, { alignment: 'right' });
            }}
            editor={editor}
            config={config}
          />
          <RegularButton
            Icon={({ className }) => (
              <AccessibilityIcon className={className} height="15px" width="15px" />
            )}
            text={'gif.accessibility'}
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
            text={'gif.align-size'}
            getIsActive={() => isCustomSizeEnabled}
            getIsDisabled={() => false}
            iconStyling="fill"
            onClick={() => {
              editor.commands.updateAttributes(VideoNode.name, {
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
            label={t('gif.width')}
            value={currentAttributes.customWidth === null ? 320 : currentAttributes.customWidth}
            isDisabled={!isCustomSizeEnabled}
            onChange={value =>
              editor.commands.updateAttributes(VideoNode.name, { customWidth: value })
            }
          />
          <NumberInput
            label={t('gif.height')}
            value={currentAttributes.customHeight === null ? 180 : currentAttributes.customHeight}
            isDisabled={!isCustomSizeEnabled}
            onChange={value =>
              editor.commands.updateAttributes(VideoNode.name, { customHeight: value })
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
  videoId: string
) => {
  const uploadValue = await config.onVideoAddClick();
  await handleFileVideo(uploadValue.tempFile, editor, videoId, true);
  await handleFileVideo(await uploadValue.finalFile, editor, videoId);
};

const extensionControlledOnChange = async (
  e: React.ChangeEvent<HTMLInputElement>,
  config: ExtensionControlledUploadConfig,
  editor: InputIconButtonParams<ExtensionControlledUploadConfig>['editor'],
  videoId: string
) => {
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

    await handleFileVideo(
      {
        src,
      },
      editor,
      videoId,
      true
    );

    const finalImg = await config.onVideoAdd(file, {
      src,
    });
    await handleFileVideo(finalImg, editor, videoId);
  };
};

export const VideoBubbleMenu: BubbleMenuToolbar<UploadConfig> = {
  Menu: BubbleMenu,
  shouldShow: ({ editor }) => {
    return editor.isActive(VideoNode.name) && !editor.getAttributes(VideoNode.name).isLoading;
  },
};
