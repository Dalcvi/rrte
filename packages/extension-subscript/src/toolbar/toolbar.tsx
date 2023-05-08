import type { RegularButtonConfig } from '@rrte/common';
import SubscriptIcon from './subscript.icon.svg';
import { SubscriptMark } from '../mark';
import { Editor } from '@tiptap/core';
import classNames from 'classnames';
import classes from './toolbar.module.scss';

const Button = ({ editor }: { editor: Editor }) => {
  const isActive = editor.isActive('subscript');
  return (
    <button
      data-testid="subscript-button"
      className={classNames(classes.subscriptButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().toggleSubscript(isActive).run();
      }}
      disabled={!editor.can().toggleSubscript(isActive)}
    >
      <SubscriptIcon
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
  name: SubscriptMark.name,
  text: 'Subscript',
  type: 'icon' as const,
  priority: 1,
};
