import type { RegularButtonConfig } from '@rrte/common';
import CodeIcon from './code.icon.svg';
import { CodeMark } from '../mark';
import { Editor } from '@tiptap/core';
import classNames from 'classnames';
import classes from './toolbar.module.scss';

const Button = ({ editor }: { editor: Editor }) => {
  const isActive = editor.isActive(CodeMark.name);
  return (
    <button
      aria-label="code"
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
  text: 'Code',
  type: 'icon' as const,
  priority: 1,
};
