import type { BubbleMenuToolbar } from '@rrte/common';
import classes from './video-bubble-menu.module.scss';
import ReplaceIcon from './replace.icon.svg';
import AlignLeft from './align-left.icon.svg';
import AlignRight from './align-right.icon.svg';
import AlignCenter from './align-center.icon.svg';
import CustomSize from './custom-size.icon.svg';
import { VideoAttributes, VideoNode } from '../node';
import { ExtensionControlledUploadConfig, UploadConfig, UserControlledUploadConfig } from '../upload-config';
import classNames from 'classnames';
import { Editor } from '@tiptap/core';
import { handleFileVideo } from './toolbar.utils';
import { useEffect, useState } from 'react';

const BubbleMenu: BubbleMenuToolbar<UploadConfig>['Menu'] = ({ editor, config }) => {
  const [maxWidth, setMaxWidth] = useState(0);
  const currentAttributes = editor.getAttributes(VideoNode.name) as VideoAttributes & { id: string | undefined };

  useEffect(() => {
    const editor = document.querySelector("[data-hook='rrce-editor']") as HTMLElement;
    if (!editor) {
      return;
    }
    const observer = new ResizeObserver((entries) => {
      const maxWidth = entries[0].contentRect.width;
      setMaxWidth(maxWidth);
    });
    observer.observe(editor);

    return () => {
      observer.disconnect();
    };
  }, []);

  const videoId = currentAttributes.id;
  if (!videoId) {
    return <></>;
  }
  const isCustomSizeEnabled = !!currentAttributes.customSize;
  const alignment = currentAttributes.alignment;
  return (
    <div className={classes.bubbleMenu} style={{ maxWidth: `${maxWidth}px` }}>
      <ChangeVideoButton config={config} editor={editor} videoId={videoId} />
      <button
        className={classNames(classes.button, {
          [classes.buttonActive]: alignment === 'left',
        })}
        onClick={() => {
          editor.commands.updateAttributes(VideoNode.name, { alignment: 'left' });
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
        className={classNames(classes.button, {
          [classes.buttonActive]: alignment === 'center',
        })}
        onClick={() => {
          editor.commands.updateAttributes(VideoNode.name, { alignment: 'center' });
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
        className={classNames(classes.button, {
          [classes.buttonActive]: alignment === 'right',
        })}
        onClick={() => {
          editor.commands.updateAttributes(VideoNode.name, { alignment: 'right' });
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
        className={classNames(classes.button, {
          [classes.buttonActive]: isCustomSizeEnabled,
        })}
        onClick={() => {
          editor.commands.updateAttributes(VideoNode.name, { customSize: !isCustomSizeEnabled });
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
        Width:
        <input
          disabled={!isCustomSizeEnabled}
          className={classes.inputField}
          type="number"
          value={currentAttributes.width === null ? 320 : currentAttributes.width}
          onChange={(e) => editor.commands.updateAttributes(VideoNode.name, { width: Number(e.target.value) })}
        />
      </label>
      <label className={classes.inputContainer}>
        Height:
        <input
          disabled={!isCustomSizeEnabled}
          className={classes.inputField}
          type="number"
          value={currentAttributes.height === null ? 180 : currentAttributes.height}
          onChange={(e) => editor.commands.updateAttributes(VideoNode.name, { height: Number(e.target.value) })}
        />
      </label>
    </div>
  );
};

const ChangeVideoButton = ({ editor, config, videoId }: { editor: Editor; config: UploadConfig; videoId: string }) => {
  if (config.type === 'user-controlled') {
    return <UserControlledChangeButton editor={editor} config={config} videoId={videoId} />;
  }

  return <ExtensionControlledChangeButton editor={editor} config={config} videoId={videoId} />;
};

const ExtensionControlledChangeButton = ({
  editor,
  config,
  videoId,
}: {
  editor: Editor;
  config: ExtensionControlledUploadConfig;
  videoId: string;
}) => {
  return (
    <div className={classes.button}>
      <input
        type="file"
        accept={config.acceptedVideoFileTypes.join(', ')}
        className={classes.videoInput}
        value={''}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) {
            return;
          }
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = async (e) => {
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
              true,
            );

            const finalImg = await config.onVideoAdd(file, {
              src,
            });
            await handleFileVideo(finalImg, editor, videoId);
          };
        }}
      />
      <ReplaceIcon width={'15px'} height={'15px'} />
    </div>
  );
};

const UserControlledChangeButton = ({
  editor,
  config,
  videoId,
}: {
  editor: Editor;
  config: UserControlledUploadConfig;
  videoId: string;
}) => {
  return (
    <button
      data-hook="user-controlled-video-button"
      className={classNames(classes.button)}
      onClick={async () => {
        const uploadValue = await config.onVideoAddClick();
        await handleFileVideo(uploadValue.tempFile, editor, videoId, true);
        await handleFileVideo(await uploadValue.finalFile, editor, videoId);
      }}
    >
      <ReplaceIcon width={'15px'} height={'15px'} />
    </button>
  );
};

export const VideoBubbleMenu: BubbleMenuToolbar<UploadConfig> = {
  Menu: BubbleMenu,
  shouldShow: ({ editor }) => {
    return editor.isActive(VideoNode.name) && !editor.getAttributes(VideoNode.name).isLoading;
  },
};
