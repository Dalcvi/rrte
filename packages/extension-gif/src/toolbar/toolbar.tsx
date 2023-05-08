import type { RegularButtonConfig } from '@rrte/common';
import GifIcon from './gif.icon.svg';
import { GifNode } from '../node';
import { Editor } from '@tiptap/core';
import classNames from 'classnames';
import classes from './toolbar.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { GifConfig } from '../gif-config';
import { GifSearch } from './gif-search.component';

const Button = ({ editor, config }: { editor: Editor; config: GifConfig }) => {
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
    [container],
  );
  const escapeClose = useMemo(
    () => (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    },
    [close],
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
        data-hook="gif-button"
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
          onGifSelect={(gifAttrs) => {
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
  text: 'Gif',
  type: 'icon' as const,
  priority: 1,
};
