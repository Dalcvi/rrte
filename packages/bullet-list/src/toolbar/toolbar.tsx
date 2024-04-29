import type { RegularButtonConfig } from '@rrte/common';
import classNames from 'classnames';
import { BulletListNode } from '../node';
import BulletListIcon from './bulletlist.icon.svg';
import classes from './toolbar.module.scss';

const Button: RegularButtonConfig['Button'] = ({ editor, t }) => {
  const isActive = editor.isActive(BulletListNode.name);
  return (
    <button
      aria-label={t('bullet-list-button.text')}
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
  text: 'bullet-list-button.text',
  type: 'icon' as const,
  priority: 82,
};
