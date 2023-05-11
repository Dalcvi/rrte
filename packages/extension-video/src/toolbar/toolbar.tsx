import type { RegularButtonConfig } from '@rrte/common';
import VideoIcon from './video.icon.svg';
import { VideoNode } from '../node';
import { Editor } from '@tiptap/core';
import classNames from 'classnames';
import classes from './toolbar.module.scss';
import { ExtensionControlledUploadConfig, UploadConfig, UserControlledUploadConfig } from '../upload-config';
import { createTempVideo, handleFileVideo } from './toolbar.utils';

const Button = ({ editor, config }: { editor: Editor; config: UploadConfig }) => {
  if (config.type === 'user-controlled') {
    return <UserControlledButton editor={editor} config={config} />;
  }
  return <ExtensionControlledButton editor={editor} config={config} />;
};

const ExtensionControlledButton = ({ editor, config }: { editor: Editor; config: ExtensionControlledUploadConfig }) => {
  const selected = editor.isActive('video');
  return (
    <div
      className={classNames(classes.videoButton, {
        [classes.disabledButton]: !editor.can().setVideo({ src: '' }),
        [classes.buttonActive]: selected,
      })}
    >
      <input
        aria-label="add video"
        type="file"
        disabled={!editor.can().setVideo({ src: '' })}
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
            const tempImgId = await createTempVideo(editor, {
              src,
            });

            const finalImg = await config.onVideoAdd(file, {
              src,
            });
            await handleFileVideo(finalImg, editor, tempImgId);
          };
        }}
      />
      <VideoIcon
        className={classNames(classes.icon, {
          [classes.active]: selected,
        })}
        width={'15px'}
        height={'15px'}
      />
    </div>
  );
};

const UserControlledButton = ({ editor, config }: { editor: Editor; config: UserControlledUploadConfig }) => {
  const selected = editor.isActive('video');
  return (
    <button
      aria-label="add video"
      data-testid="user-controlled-video-button"
      disabled={!editor.can().setVideo({ src: '' })}
      className={classNames(classes.videoButton, {
        [classes.disabledButton]: !editor.can().setVideo({ src: '' }),
        [classes.buttonActive]: selected,
      })}
      onClick={async () => {
        const uploadValue = await config.onVideoAddClick();
        const tempImgId = await createTempVideo(editor, uploadValue.tempFile);
        await handleFileVideo(await uploadValue.finalFile, editor, tempImgId);
      }}
    >
      <VideoIcon
        className={classNames(classes.icon, {
          [classes.active]: selected,
        })}
        width={'15px'}
        height={'15px'}
      />
    </button>
  );
};

export const ToolbarButton: RegularButtonConfig<UploadConfig> = {
  Button,
  name: VideoNode.name,
  text: 'Video',
  type: 'icon' as const,
  priority: 1,
};
