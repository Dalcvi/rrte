import type { RegularButtonConfig } from '@rrte/common';
import classNames from 'classnames';
import { BoldMark } from '../mark';
import BoldIcon from './bold.icon.svg';
import classes from './toolbar.module.scss';

const Button: RegularButtonConfig['Button'] = ({ editor, t }) => {
  const isActive = editor.isActive('bold');
  return (
    <button
      aria-label={t('bold-button.text')}
      data-testid="bold-button"
      className={classNames(classes.boldButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().toggleBold().run();
      }}
      disabled={!editor.can().toggleBold()}
    >
      <BoldIcon
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
  name: BoldMark.name,
  text: 'bold-button.text',
  type: 'icon' as const,
  priority: 98,
};
