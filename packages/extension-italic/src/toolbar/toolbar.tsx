import type { RegularButtonConfig } from '@rrte/common';
import ItalicIcon from './italic.icon.svg';
import { ItalicMark } from '../mark';
import { Editor } from '@tiptap/core';
import classNames from 'classnames';
import classes from './toolbar.module.scss';

const Button = ({ editor }: { editor: Editor }) => {
  const isActive = editor.isActive('italic');
  return (
    <button
      aria-label="italic"
      data-testid="italic-button"
      className={classNames(classes.italicButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().toggleItalic(isActive).run();
      }}
      disabled={!editor.can().toggleItalic(isActive)}
    >
      <ItalicIcon
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
  name: ItalicMark.name,
  text: 'Italic',
  type: 'icon' as const,
  priority: 1,
};
