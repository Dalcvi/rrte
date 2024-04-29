import type { RegularButtonConfig } from '@rrte/common';
import classNames from 'classnames';
import { CodeBlockNode } from '../node';
import CodeblockIcon from './codeblock.icon.svg';
import classes from './toolbar.module.scss';

const Button: RegularButtonConfig['Button'] = ({ editor, t }) => {
  const isActive = editor.isActive(CodeBlockNode.name);
  return (
    <button
      aria-label={t('codeblock-button.text')}
      data-testid="codeblock-button"
      disabled={!editor.can().toggleCodeBlock()}
      className={classNames(classes.codeblockButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().toggleCodeBlock().run();
      }}
    >
      <CodeblockIcon
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
  name: CodeBlockNode.name,
  text: 'codeblock-button.text',
  type: 'icon' as const,
  priority: 87,
};
