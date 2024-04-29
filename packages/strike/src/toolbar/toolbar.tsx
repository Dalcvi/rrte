import type { RegularButtonConfig } from '@rrte/common';
import classNames from 'classnames';
import { StrikeMark } from '../mark';
import StrikeIcon from './strike.icon.svg';
import classes from './toolbar.module.scss';

const Button: RegularButtonConfig['Button'] = ({ editor, t }) => {
  const isActive = editor.isActive('strike');
  return (
    <button
      data-testid="strike-button"
      aria-label={t('strike-button.text')}
      className={classNames(classes.strikeButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().toggleStrike().run();
      }}
      disabled={!editor.can().toggleStrike()}
    >
      <StrikeIcon
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
  name: StrikeMark.name,
  text: 'strike-button.text',
  type: 'icon' as const,
  priority: 96,
};
