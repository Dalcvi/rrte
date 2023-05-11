import { RegularButtonConfig } from '@rrte/common';
import { TextAlignExtension } from '../extension';
import { Editor } from '@tiptap/core';
import classNames from 'classnames';
import classes from './toolbar.module.scss';
import AlignRightIcon from './align-right.icon.svg';
import { TextAlignConfig } from '../text-align-config';

const TextAlignToolbarButton = ({ editor, config }: { editor: Editor; config: TextAlignConfig }) => {
  const isActive = config.types.some((type) => editor.isActive(type, { textAlign: 'right' }));
  return (
    <button
      data-testid="text-align-right-button"
      aria-label="text align right"
      className={classNames(classes.textAlignButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().setTextAlign('right').run();
      }}
      disabled={!editor.can().setTextAlign('right')}
    >
      <AlignRightIcon
        height={'15px'}
        width={'15px'}
        className={classNames(classes.icon, {
          [classes.active]: isActive,
        })}
      />
    </button>
  );
};

export const RightAlignToolbarButton: RegularButtonConfig<TextAlignConfig> = {
  Button: TextAlignToolbarButton,
  name: `${TextAlignExtension.name}-right`,
  text: 'Text align right',
  type: 'icon' as const,
  priority: 1,
};
