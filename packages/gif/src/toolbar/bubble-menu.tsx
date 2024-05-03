import type { BubbleMenuToolbar } from '@rrte/common';
import { BubbleMenuWrapper, ModalButton, NumberInput, RegularButton } from '@rrte/toolbar';
import { GifAttributes, GifNode } from '../node';
import AlignCenter from './align-center.icon.svg';
import AlignLeft from './align-left.icon.svg';
import AlignRight from './align-right.icon.svg';
import CustomSize from './custom-size.icon.svg';
import classes from './gif-bubble-menu.module.scss';
import { GifSearch } from './gif-search.component';
import ReplaceIcon from './replace.icon.svg';
import { useState } from 'react';

const BubbleMenu: BubbleMenuToolbar['Menu'] = ({ editor, config, t }) => {
  const currentAttributes = editor.getAttributes(GifNode.name) as GifAttributes & {
    id: string | undefined;
  };
  const [firstBubbleMenuItem, setFirstBubbleMenuItem] = useState<HTMLElement | null>(null);

  const isCustomSizeEnabled = !!currentAttributes.customSize;
  const alignment = currentAttributes.alignment;
  return (
    <BubbleMenuWrapper firstChild={firstBubbleMenuItem}>
      <div className={classes.bubbleMenu}>
        <div className={classes.row}>
          <ModalButton
            text="gif.replace"
            Icon={({ className }) => (
              <ReplaceIcon className={className} height="15px" width="15px" />
            )}
            editor={editor}
            config={config}
            name="gif-replace"
            iconStyling="stroke"
            getIsDisabled={() => false}
            ModalContent={({ editor, config, setFirstItemRef, setLastItemRef, closeModal }) => (
              <GifSearch
                sdk={config.sdkKey}
                setFirstItemRef={setFirstItemRef}
                setLastItemRef={setLastItemRef}
                onGifSelect={gifAttrs => {
                  closeModal();
                  editor.commands.setGif(gifAttrs);
                }}
              />
            )}
          />
          <RegularButton
            ref={setFirstBubbleMenuItem}
            Icon={({ className }) => <AlignLeft className={className} height="15px" width="15px" />}
            text={'gif.align-left'}
            getIsActive={() => alignment === 'left'}
            getIsDisabled={() => false}
            iconStyling="stroke"
            onClick={() => {
              editor.commands.updateAttributes(GifNode.name, { alignment: 'left' });
            }}
            editor={editor}
            config={config}
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
              editor.commands.updateAttributes(GifNode.name, { alignment: 'center' });
            }}
            editor={editor}
            config={config}
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
              editor.commands.updateAttributes(GifNode.name, { alignment: 'right' });
            }}
            editor={editor}
            config={config}
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
              editor.commands.updateAttributes(GifNode.name, { customSize: !isCustomSizeEnabled });
            }}
            editor={editor}
            config={config}
          />
        </div>
        <hr className={classes.divider} />
        <div className={classes.row}>
          <NumberInput
            label={t('gif.width')}
            value={
              currentAttributes.customWidth === null
                ? currentAttributes.originalWidth
                : currentAttributes.customWidth
            }
            isDisabled={!isCustomSizeEnabled}
            onChange={value =>
              editor.commands.updateAttributes(GifNode.name, { customWidth: value })
            }
          />
          <NumberInput
            label={t('gif.height')}
            value={
              currentAttributes.customHeight === null
                ? currentAttributes.originalHeight
                : currentAttributes.customHeight
            }
            isDisabled={!isCustomSizeEnabled}
            onChange={value =>
              editor.commands.updateAttributes(GifNode.name, { customHeight: value })
            }
          />
        </div>
      </div>
    </BubbleMenuWrapper>
  );
};

export const GifBubbleMenu: BubbleMenuToolbar = {
  Menu: BubbleMenu,
  shouldShow: ({ editor }) => {
    return editor.isActive(GifNode.name);
  },
};
