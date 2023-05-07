import type { RegularButtonConfig } from '@rrte/common';
import YoutubeIcon from './youtube.icon.svg';
import { YoutubeNode } from '../node';
import { Editor } from '@tiptap/core';
import classNames from 'classnames';
import classes from './toolbar.module.scss';

const Button = ({ editor }: { editor: Editor }) => {
  const isActive = editor.isActive(YoutubeNode.name);
  return (
    <button
      data-hook="blockquote-button"
      disabled={!editor.can().toggleYoutube()}
      className={classNames(classes.blockquoteButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().toggleYoutube().run();
      }}
    >
      <YoutubeIcon
        height={'10px'}
        width={'10px'}
        className={classNames(classes.icon, {
          [classes.active]: isActive,
        })}
      />
    </button>
  );
};

export const ToolbarButton: RegularButtonConfig = {
  Button,
  name: YoutubeNode.name,
  text: 'Youtube',
  type: 'icon' as const,
  priority: 1,
};
