import type { RegularButtonConfig } from '@rrte/common';
import classNames from 'classnames';
import { VideoNode } from '../node';
import {
  ExtensionControlledUploadConfig,
  UploadConfig,
  UserControlledUploadConfig,
} from '../upload-config';
import classes from './toolbar.module.scss';
import { createTempVideo, handleFileVideo } from './toolbar.utils';
import VideoIcon from './video.icon.svg';

const Button: RegularButtonConfig<UploadConfig>['Button'] = ({ config, ...rest }) => {
  if (config.type === 'user-controlled') {
    return <UserControlledButton config={config} {...rest} />;
  }
  return <ExtensionControlledButton config={config} {...rest} />;
};

const ExtensionControlledButton: RegularButtonConfig<ExtensionControlledUploadConfig>['Button'] = ({
  editor,
  config,
  t,
}) => {
  return (
    <div
      className={classNames(classes.videoButton, {
        [classes.disabledButton]: !editor.can().setVideo({ src: '' }),
      })}
    >
      <input
        aria-label={t('video-button.text')}
        type="file"
        disabled={!editor.can().setVideo({ src: '' })}
        accept={config.acceptedVideoFileTypes.join(', ')}
        className={classes.videoInput}
        value={''}
        onChange={async e => {
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
        }}
      />
      <VideoIcon className={classNames(classes.icon)} width={'15px'} height={'15px'} />
    </div>
  );
};

const UserControlledButton: RegularButtonConfig<UserControlledUploadConfig>['Button'] = ({
  editor,
  config,
  t,
}) => {
  return (
    <button
      aria-label={t('video-button.text')}
      data-testid="user-controlled-video-button"
      disabled={!editor.can().setVideo({ src: '' })}
      className={classNames(classes.videoButton, {
        [classes.disabledButton]: !editor.can().setVideo({ src: '' }),
      })}
      onClick={async () => {
        const uploadValue = await config.onVideoAddClick();
        const tempImgId = await createTempVideo(editor, uploadValue.tempFile);
        await handleFileVideo(await uploadValue.finalFile, editor, tempImgId);
      }}
    >
      <VideoIcon className={classNames(classes.icon)} width={'15px'} height={'15px'} />
    </button>
  );
};

export const ToolbarButton: RegularButtonConfig<UploadConfig> = {
  Button,
  name: VideoNode.name,
  text: 'video-button.text',
  type: 'icon' as const,
  priority: 1,
};
