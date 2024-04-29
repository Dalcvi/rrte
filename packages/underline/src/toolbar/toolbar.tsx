import type { RegularButtonConfig } from '@rrte/common';
import classNames from 'classnames';
import { UnderlineMark } from '../mark';
import classes from './toolbar.module.scss';
import UnderlineIcon from './underline.icon.svg';

const Button: RegularButtonConfig['Button'] = ({ editor, t }) => {
  const isActive = editor.isActive('underline');
  return (
    <button
      data-testid="underline-button"
      aria-label={t('underline-button.text')}
      className={classNames(classes.underlineButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().toggleUnderline().run();
      }}
      disabled={!editor.can().toggleUnderline()}
    >
      <UnderlineIcon
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
  name: UnderlineMark.name,
  text: 'underline-button.text',
  type: 'icon' as const,
  priority: 95,
};
