import type { RegularButtonConfig } from '@rrte/common';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { GifConfig } from '../gif-config';
import { GifNode } from '../node';
import { GifSearch } from './gif-search.component';
import GifIcon from './gif.icon.svg';
import classes from './toolbar.module.scss';

const Button: RegularButtonConfig<GifConfig>['Button'] = ({ editor, config, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const isActive = editor.isActive(GifNode.name);
  const close = useMemo(
    () => (e?: MouseEvent) => {
      if (e && container && container.contains(e.target as Node)) {
        return;
      }
      document.removeEventListener('click', close);
      document.removeEventListener('keydown', escapeClose);
      setIsOpen(false);
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
        data-testid="gif-button"
        aria-label={t('gif-button.text')}
        disabled={!editor.can().setGif({ originalHeight: 0, originalWidth: 0 })}
        className={classNames(classes.gifButton, {
          [classes.active]: isActive,
        })}
        onClick={() => {
          setIsOpen(true);
          document.addEventListener('click', close);
          document.addEventListener('keydown', escapeClose);
        }}
      >
        <GifIcon
          height={'15px'}
          width={'15px'}
          className={classNames(classes.icon, {
            [classes.active]: isActive,
          })}
        />
      </button>
      {isOpen && (
        <GifSearch
          sdk={config.sdkKey}
          onGifSelect={gifAttrs => {
            close();
            editor.commands.setGif(gifAttrs);
          }}
        />
      )}
    </div>
  );
};

export const ToolbarButton: RegularButtonConfig<GifConfig> = {
  Button,
  name: GifNode.name,
  text: 'gif-button.text',
  type: 'icon' as const,
  priority: 1,
};
