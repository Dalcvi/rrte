import type { RegularButtonConfig } from '@rrte/common';
import classNames from 'classnames';
import { CodeMark } from '../mark';
import CodeIcon from './code.icon.svg';
import classes from './toolbar.module.scss';

const Button: RegularButtonConfig['Button'] = ({ editor, t }) => {
  const isActive = editor.isActive(CodeMark.name);
  return (
    <button
      aria-label={t('code-button.text')}
      data-testid="code-button"
      className={classNames(classes.codeButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().toggleCode().run();
      }}
      disabled={!editor.can().toggleCode()}
    >
      <CodeIcon
        height={'14px'}
        width={'14px'}
        className={classNames(classes.icon, {
          [classes.active]: isActive,
        })}
      />
    </button>
  );
};

export const ToolbarButton: RegularButtonConfig = {
  Button,
  name: CodeMark.name,
  text: 'code-button.text',
  type: 'icon' as const,
  priority: 86,
};
