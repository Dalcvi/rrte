import { RegularButtonConfig } from '@rrte/common';
import { TextAlignExtension } from '../extension';
import { Editor } from '@tiptap/core';
import classNames from 'classnames';
import classes from './toolbar.module.scss';
import AlignLeftIcon from './align-left.icon.svg';
import { TextAlignConfig } from '../text-align-config';

const TextAlignToolbarButton = ({ editor, config }: { editor: Editor; config: TextAlignConfig }) => {
  const isActive = config.types.some((type) => editor.isActive(type, { textAlign: 'left' }));
  return (
    <button
      data-testid="text-align-left-button"
      aria-label="text align left"
      className={classNames(classes.textAlignButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().setTextAlign('left').run();
      }}
      disabled={!editor.can().setTextAlign('left')}
    >
      <AlignLeftIcon
        height={'15px'}
        width={'15px'}
        className={classNames(classes.icon, {
          [classes.active]: isActive,
        })}
      />
    </button>
  );
};

export const LeftAlignToolbarButton: RegularButtonConfig<TextAlignConfig> = {
  Button: TextAlignToolbarButton,
  name: `${TextAlignExtension.name}-left`,
  text: 'Text align left',
  type: 'icon' as const,
  priority: 1,
};
