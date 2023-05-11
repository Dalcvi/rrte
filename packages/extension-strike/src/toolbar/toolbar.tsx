import type { RegularButtonConfig } from '@rrte/common';
import StrikeIcon from './strike.icon.svg';
import { StrikeMark } from '../mark';
import { Editor } from '@tiptap/core';
import classNames from 'classnames';
import classes from './toolbar.module.scss';

const Button = ({ editor }: { editor: Editor }) => {
  const isActive = editor.isActive('strike');
  return (
    <button
      data-testid="strike-button"
      aria-label="strike"
      className={classNames(classes.strikeButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().toggleStrike(isActive).run();
      }}
      disabled={!editor.can().toggleStrike(isActive)}
    >
      <StrikeIcon
        height={'15px'}
        width={'15px'}
        className={classNames(classes.icon, {
          [classes.active]: isActive,
        })}
      />
    </button>
  );
};

export const ToolbarButton: RegularButtonConfig = {
  Button,
  name: StrikeMark.name,
  text: 'Strike',
  type: 'icon' as const,
  priority: 1,
};
