import type { RegularButtonConfig } from '@rrte/common';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { YoutubeNode } from '../node';
import classes from './toolbar.module.scss';
import { getYouTubeID } from './toolbar.utils';
import YoutubeIcon from './youtube.icon.svg';

const Button: RegularButtonConfig['Button'] = ({ editor, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const videoId = getYouTubeID(url);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const isActive = editor.isActive(YoutubeNode.name);
  const close = useMemo(
    () => (e?: MouseEvent) => {
      if (e && container && container.contains(e.target as Node)) {
        return;
      }
      document.removeEventListener('click', close);
      document.removeEventListener('keydown', escapeClose);
      setIsOpen(false);
      setUrl('');
    },
    [container]
  );

  const escapeClose = useMemo(
    () => (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    return () => {
      document.removeEventListener('click', close);
      document.removeEventListener('keydown', escapeClose);
    };
  }, [container]);

  return (
    <div className={classes.container} ref={setContainer}>
      <button
        data-testid="youtube-button"
        aria-label={t('youtube-button.text')}
        disabled={!editor.can().setYoutube({ url: '', id: 'video' })}
        className={classNames(classes.youtubeButton, {
          [classes.active]: isActive,
        })}
        onClick={() => {
          setIsOpen(true);
          document.addEventListener('click', close);
          document.addEventListener('keydown', escapeClose);
        }}
      >
        <YoutubeIcon
          height={'15px'}
          width={'15px'}
          className={classNames(classes.icon, {
            [classes.active]: isActive,
          })}
        />
      </button>
      {isOpen && (
        <div className={classes.inputContainer}>
          <label className={classes.inputLabel}>
            {t('youtube-url-input.label')}
            <input
              data-testid="youtube-input"
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className={classes.input}
            />
          </label>
          <button
            aria-label={t('youtube-add')}
            data-testid="youtube-add-button"
            onClick={() => {
              if (!videoId) {
                return;
              }
              editor.chain().focus().setYoutube({ url, id: videoId }).run();
              close();
            }}
            disabled={!videoId}
            className={classes.inputButton}
          >
            {t('youtube-add')}
          </button>
        </div>
      )}
    </div>
  );
};

export const ToolbarButton: RegularButtonConfig = {
  Button,
  name: YoutubeNode.name,
  text: 'youtube-button.text',
  type: 'icon' as const,
  priority: 1,
};
