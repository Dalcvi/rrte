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
      aria-label="subscript"
      className={classNames(classes.subscriptButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().toggleSubscript().run();
      }}
      disabled={!editor.can().toggleSubscript()}
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
  text: 'subscript-button.text',
  type: 'icon' as const,
  priority: 93,
};
