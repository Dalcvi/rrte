import type { BubbleMenuToolbar } from '@rrte/common';
import classes from './gif-bubble-menu.module.scss';
import AlignLeft from './align-left.icon.svg';
import AlignRight from './align-right.icon.svg';
import AlignCenter from './align-center.icon.svg';
import CustomSize from './custom-size.icon.svg';
import { GifAttributes, GifNode } from '../node';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import ReplaceIcon from './replace.icon.svg';
import { GifSearch } from './gif-search.component';

const BubbleMenu: BubbleMenuToolbar['Menu'] = ({ editor, config }) => {
  const [maxWidth, setMaxWidth] = useState(0);
  const currentAttributes = editor.getAttributes(GifNode.name) as GifAttributes & { id: string | undefined };
  const [isOpen, setIsOpen] = useState(false);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
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
      close();
    };
  }, [container]);

  useEffect(() => {
    const editor = document.querySelector("[data-hook='rrte-editor']") as HTMLElement;
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

  const isCustomSizeEnabled = !!currentAttributes.customSize;
  const alignment = currentAttributes.alignment;
  return (
    <div className={classes.bubbleMenu} style={{ maxWidth: `${maxWidth}px` }}>
      <div className={classes.gifContainer} ref={setContainer}>
        <button
          className={classNames(classes.button)}
          onClick={() => {
            document.addEventListener('click', close);
            document.addEventListener('keydown', escapeClose);
            setIsOpen(true);
          }}
        >
          <ReplaceIcon
            width="20px"
            height="20px"
            className={classNames(classes.icon, {
              [classes.active]: alignment === 'left',
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
      <button
        className={classNames(classes.button, {
          [classes.buttonActive]: alignment === 'left',
        })}
        onClick={() => {
          editor.commands.updateAttributes(GifNode.name, { alignment: 'left' });
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
          editor.commands.updateAttributes(GifNode.name, { alignment: 'center' });
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
          editor.commands.updateAttributes(GifNode.name, { alignment: 'right' });
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
          editor.commands.updateAttributes(GifNode.name, { customSize: !isCustomSizeEnabled });
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
          value={
            currentAttributes.customWidth === null ? currentAttributes.originalWidth : currentAttributes.customWidth
          }
          onChange={(e) => editor.commands.updateAttributes(GifNode.name, { customWidth: Number(e.target.value) })}
        />
      </label>
      <label className={classes.inputContainer}>
        Hight:
        <input
          disabled={!isCustomSizeEnabled}
          className={classes.inputField}
          type="number"
          value={
            currentAttributes.customHeight === null ? currentAttributes.originalHeight : currentAttributes.customHeight
          }
          onChange={(e) => editor.commands.updateAttributes(GifNode.name, { customHeight: Number(e.target.value) })}
        />
      </label>
    </div>
  );
};

export const GifBubbleMenu: BubbleMenuToolbar = {
  Menu: BubbleMenu,
  shouldShow: ({ editor }) => {
    return editor.isActive(GifNode.name);
  },
};
