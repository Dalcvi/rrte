import type { RegularButtonConfig } from '@rrte/common';
import UnderlineIcon from './underline.icon.svg';
import { UnderlineMark } from '../mark';
import { Editor } from '@tiptap/core';
import classNames from 'classnames';
import classes from './toolbar.module.scss';

const Button = ({ editor }: { editor: Editor }) => {
  const isActive = editor.isActive('underline');
  return (
    <button
      data-testid="underline-button"
      aria-label="underline"
      className={classNames(classes.underlineButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().toggleUnderline().run();
      }}
      disabled={!editor.can().toggleUnderline()}
    >
      <UnderlineIcon
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
  name: UnderlineMark.name,
  text: 'Underline',
  type: 'icon' as const,
  priority: 95,
};
