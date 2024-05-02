import type { ModalButtonConfig } from '@rrte/common';
import { useTranslations } from '@rrte/i18n';
import { useState } from 'react';
import { YoutubeNode } from '../node';
import classes from './toolbar.module.scss';
import { getYouTubeID } from './toolbar.utils';
import YoutubeIcon from './youtube.icon.svg';
import { Button, TextInput } from '@rrte/toolbar';

const YoutubeModalContent: ModalButtonConfig['ModalContent'] = ({
  editor,
  setFirstItemRef,
  setLastItemRef,
  closeModal,
}) => {
  const [url, setUrl] = useState('');
  const videoId = getYouTubeID(url);
  const { t } = useTranslations();

  return (
    <div className={classes.inputContainer}>
      <TextInput
        label={t('youtube-url-input.label')}
        onChange={setUrl}
        value={url}
        ref={setFirstItemRef}
      />
      <Button
        aria-label={t('youtube-add')}
        data-testid="youtube-add-button"
        ref={setLastItemRef}
        onClick={() => {
          if (!videoId) {
            return;
          }
          editor.chain().focus().setYoutube({ url, id: videoId }).run();
          closeModal();
        }}
        disabled={!videoId}
        text={t('youtube-add')}
      />
    </div>
  );
};

export const ToolbarButton: ModalButtonConfig = {
  name: YoutubeNode.name,
  text: 'youtube-button.text',
  type: 'modal' as const,
  priority: 1,
  Icon: ({ className }) => <YoutubeIcon height={'15px'} width={'15px'} className={className} />,
  ModalContent: YoutubeModalContent,
  getIsDisabled: ({ editor }) => !editor.can().setYoutube({ url: '', id: '' }),
  iconStyling: 'fill',
  group: {
    name: 'media',
    text: 'media-group.text',
    priority: 3,
    toolbar: 'footer',
  },
};
