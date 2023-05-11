import type { RegularButtonConfig } from '@rrte/common';
import CodeblockIcon from './codeblock.icon.svg';
import { CodeBlockNode } from '../node';
import { Editor } from '@tiptap/core';
import classNames from 'classnames';
import classes from './toolbar.module.scss';

const Button = ({ editor }: { editor: Editor }) => {
  const isActive = editor.isActive(CodeBlockNode.name);
  return (
    <button
      aria-label="codeblock"
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
  text: 'Code Block',
  type: 'icon' as const,
  priority: 1,
};
