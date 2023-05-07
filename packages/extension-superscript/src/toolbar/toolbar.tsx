import type { RegularButtonConfig } from '@rrte/common';
import SuperscriptIcon from './superscript.icon.svg';
import { SuperscriptMark } from '../mark';
import { Editor } from '@tiptap/core';
import classNames from 'classnames';
import classes from './toolbar.module.scss';

const Button = ({ editor }: { editor: Editor }) => {
  const isActive = editor.isActive('superscript');
  return (
    <button
      data-hook="superscript-button"
      className={classNames(classes.superscriptButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().toggleSuperscript(isActive).run();
      }}
      disabled={!editor.can().toggleSuperscript(isActive)}
    >
      <SuperscriptIcon
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
  name: SuperscriptMark.name,
  text: 'Superscript',
  type: 'icon' as const,
  priority: 1,
};
