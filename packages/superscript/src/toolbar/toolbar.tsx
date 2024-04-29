import type { RegularButtonConfig } from '@rrte/common';
import classNames from 'classnames';
import { SuperscriptMark } from '../mark';
import SuperscriptIcon from './superscript.icon.svg';
import classes from './toolbar.module.scss';

const Button: RegularButtonConfig['Button'] = ({ editor, t }) => {
  const isActive = editor.isActive('superscript');
  return (
    <button
      data-testid="superscript-button"
      aria-label={t('superscript-button.text')}
      className={classNames(classes.superscriptButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().toggleSuperscript().run();
      }}
      disabled={!editor.can().toggleSuperscript()}
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
  text: 'superscript-button.text',
  type: 'icon' as const,
  priority: 94,
};
