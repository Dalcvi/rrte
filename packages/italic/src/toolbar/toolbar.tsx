import type { RegularButtonConfig } from '@rrte/common';
import classNames from 'classnames';
import { ItalicMark } from '../mark';
import ItalicIcon from './italic.icon.svg';
import classes from './toolbar.module.scss';

const Button: RegularButtonConfig['Button'] = ({ editor, t }) => {
  const isActive = editor.isActive('italic');
  return (
    <button
      aria-label={t('italic-button.text')}
      data-testid="italic-button"
      className={classNames(classes.italicButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().toggleItalic().run();
      }}
      disabled={!editor.can().toggleItalic()}
    >
      <ItalicIcon
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
  name: ItalicMark.name,
  text: 'italic-button.text',
  type: 'icon' as const,
  priority: 97,
};
