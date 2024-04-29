import type { RegularButtonConfig } from '@rrte/common';
import classNames from 'classnames';
import { OrderedListNode } from '../node';
import OrderedListIcon from './orderedlist.icon.svg';
import classes from './toolbar.module.scss';

const Button: RegularButtonConfig['Button'] = ({ editor, t }) => {
  const isActive = editor.isActive(OrderedListNode.name);
  return (
    <button
      data-testid="ordered-list-button"
      aria-label={t('ordered-list-button.text')}
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
  text: 'ordered-list-button.text',
  type: 'icon' as const,
  priority: 80,
};
