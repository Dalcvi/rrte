import type { RegularButtonConfig } from '@rrte/common';
import OrderedListIcon from './orderedlist.icon.svg';
import { OrderedListNode } from '../node';
import { Editor } from '@tiptap/core';
import classNames from 'classnames';
import classes from './toolbar.module.scss';

const Button = ({ editor }: { editor: Editor }) => {
  const isActive = editor.isActive(OrderedListNode.name);
  return (
    <button
      data-testid="ordered-list-button"
      aria-label="ordered-list"
      className={classNames(classes.orderedListButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().toggleOrderedList().run();
      }}
      disabled={!editor.can().toggleOrderedList()}
    >
      <OrderedListIcon
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
  name: OrderedListNode.name,
  text: 'Ordered list',
  type: 'icon' as const,
  priority: 80,
};
