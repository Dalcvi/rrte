import type { BubbleMenuToolbar } from '@rrte/common';
import { BubbleMenuWrapper, NumberInput, RegularButton, TextInput } from '@rrte/toolbar';
import { YoutubeAttributes, YoutubeNode } from '../node';
import AlignCenter from './align-center.icon.svg';
import AlignLeft from './align-left.icon.svg';
import AlignRight from './align-right.icon.svg';
import CustomSize from './custom-size.icon.svg';
import { getYouTubeID } from './toolbar.utils';
import classes from './youtube-bubble-menu.module.scss';

const BubbleMenu: BubbleMenuToolbar['Menu'] = ({ editor, t }) => {
  const currentAttributes = editor.getAttributes(YoutubeNode.name) as YoutubeAttributes & {
    id: string | undefined;
  };

  const isCustomSizeEnabled = !!currentAttributes.customSize;
  const alignment = currentAttributes.alignment;
  return (
    <BubbleMenuWrapper>
      <div className={classes.bubbleMenu}>
        <div className={classes.row}>
          <TextInput
            value={currentAttributes.url}
            onChange={val => {
              editor.commands.updateAttributes(YoutubeNode.name, {
                url: val,
                videoId: getYouTubeID(val),
              });
            }}
            label={t('youtube-input.label')}
          />
        </div>
        <hr className={classes.divider} />
        <div className={classes.row}>
          <RegularButton
            Icon={({ className }) => <AlignLeft className={className} height="15px" width="15px" />}
            text={'gif.align-left'}
            getIsActive={() => alignment === 'left'}
            getIsDisabled={() => false}
            iconStyling="stroke"
            onClick={() => {
              editor.commands.updateAttributes(YoutubeNode.name, { alignment: 'left' });
            }}
            editor={editor}
            config={{}}
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
              editor.commands.updateAttributes(YoutubeNode.name, { alignment: 'center' });
            }}
            editor={editor}
            config={{}}
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
              editor.commands.updateAttributes(YoutubeNode.name, { alignment: 'right' });
            }}
            editor={editor}
            config={{}}
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
              editor.commands.updateAttributes(YoutubeNode.name, {
                customSize: !isCustomSizeEnabled,
              });
            }}
            editor={editor}
            config={{}}
          />
        </div>
        <hr className={classes.divider} />
        <div className={classes.row}>
          <NumberInput
            label={t('gif.width')}
            value={currentAttributes.customWidth === null ? 320 : currentAttributes.customWidth}
            isDisabled={!isCustomSizeEnabled}
            onChange={value =>
              editor.commands.updateAttributes(YoutubeNode.name, { customWidth: value })
            }
          />
        </div>
      </div>
    </BubbleMenuWrapper>
  );
  {
    /* <div className={classes.bubbleMenu} style={{ maxWidth: `${maxWidth}px` }}>
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
    </div> */
  }
};

export const YoutubeBubbleMenu: BubbleMenuToolbar = {
  Menu: BubbleMenu,
  shouldShow: ({ editor }) => {
    return editor.isActive(YoutubeNode.name);
  },
};
