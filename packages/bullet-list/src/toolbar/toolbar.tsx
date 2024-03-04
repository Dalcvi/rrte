import type { RegularButtonConfig } from '@rrte/common';
import BulletListIcon from './bulletlist.icon.svg';
import { BulletListNode } from '../node';
import { Editor } from '@tiptap/core';
import classNames from 'classnames';
import classes from './toolbar.module.scss';

const Button = ({ editor }: { editor: Editor }) => {
  const isActive = editor.isActive(BulletListNode.name);
  return (
    <button
      aria-label="bullet list"
      data-testid="bullet-list-button"
      className={classNames(classes.bulletListButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().toggleBulletList().run();
      }}
      disabled={!editor.can().toggleBulletList()}
    >
      <BulletListIcon
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
  name: BulletListNode.name,
  text: 'Bullet list',
  type: 'icon' as const,
  priority: 82,
};
