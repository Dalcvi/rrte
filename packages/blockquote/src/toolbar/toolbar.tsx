import type { RegularButtonConfig } from '@rrte/common';
import BlockquoteIcon from './blockquote.icon.svg';
import { BlockquoteNode } from '../node';
import type {} from '@rrte/paragraph';
import { Editor } from '@tiptap/core';
import classNames from 'classnames';
import classes from './toolbar.module.scss';

const Button = ({ editor }: { editor: Editor }) => {
  const isActive = editor.isActive(BlockquoteNode.name);
  return (
    <button
      aria-label="blockquote"
      data-testid="blockquote-button"
      disabled={!editor.can().toggleBlockquote()}
      className={classNames(classes.blockquoteButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().setParagraph().toggleBlockquote().run();
      }}
    >
      <BlockquoteIcon
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
  name: BlockquoteNode.name,
  text: 'Blockquote',
  type: 'icon' as const,
  priority: 88,
};
