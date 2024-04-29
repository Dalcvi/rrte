import type { BubbleMenuToolbar } from '@rrte/common';
import classes from './youtube-bubble-menu.module.scss';
import AlignLeft from './align-left.icon.svg';
import AlignRight from './align-right.icon.svg';
import AlignCenter from './align-center.icon.svg';
import CustomSize from './custom-size.icon.svg';
import { YoutubeAttributes, YoutubeNode } from '../node';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { getYouTubeID } from './toolbar.utils';

const BubbleMenu: BubbleMenuToolbar['Menu'] = ({ editor, t }) => {
  const [maxWidth, setMaxWidth] = useState(0);
  const currentAttributes = editor.getAttributes(YoutubeNode.name) as YoutubeAttributes & {
    id: string | undefined;
  };

  useEffect(() => {
    const editor = document.querySelector("[data-testid='rrte-editor']") as HTMLElement;
    if (!editor) {
      return;
    }
    const observer = new ResizeObserver(entries => {
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
      <label className={classes.inputLabel}>
        {t('youtube-input.label')}
        <input
          data-testid="youtube-url-input"
          type="text"
          value={currentAttributes.url}
          onChange={e => {
            editor.commands.updateAttributes(YoutubeNode.name, {
              url: e.target.value,
              videoId: getYouTubeID(e.target.value),
            });
          }}
          className={classes.input}
        />
      </label>
      <button
        data-testid="youtube-align-left"
        aria-label={t('youtube-align-left.label')}
        className={classNames(classes.button, {
          [classes.buttonActive]: alignment === 'left',
        })}
        onClick={() => {
          editor.commands.updateAttributes(YoutubeNode.name, { alignment: 'left' });
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
        data-testid="youtube-align-center"
        aria-label={t('youtube-align-center.label')}
        className={classNames(classes.button, {
          [classes.buttonActive]: alignment === 'center',
        })}
        onClick={() => {
          editor.commands.updateAttributes(YoutubeNode.name, { alignment: 'center' });
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
        data-testid="youtube-align-right"
        aria-label={t('youtube-align-right.label')}
        className={classNames(classes.button, {
          [classes.buttonActive]: alignment === 'right',
        })}
        onClick={() => {
          editor.commands.updateAttributes(YoutubeNode.name, { alignment: 'right' });
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
        data-testid="youtube-custom-size"
        aria-label={t('youtube-custom-size.label')}
        className={classNames(classes.button, {
          [classes.buttonActive]: isCustomSizeEnabled,
        })}
        onClick={() => {
          editor.commands.updateAttributes(YoutubeNode.name, { customSize: !isCustomSizeEnabled });
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
        {t('youtube-width.label')}
        <input
          disabled={!isCustomSizeEnabled}
          className={classes.inputField}
          type="number"
          value={currentAttributes.customWidth === null ? 320 : currentAttributes.customWidth}
          onChange={e =>
            editor.commands.updateAttributes(YoutubeNode.name, {
              customWidth: Number(e.target.value),
            })
          }
        />
      </label>
    </div>
  );
};

export const YoutubeBubbleMenu: BubbleMenuToolbar = {
  Menu: BubbleMenu,
  shouldShow: ({ editor }) => {
    return editor.isActive(YoutubeNode.name);
  },
};
