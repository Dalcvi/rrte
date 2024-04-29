import type { RegularButtonConfig } from '@rrte/common';
import type {} from '@rrte/paragraph';
import classNames from 'classnames';
import { BlockquoteNode } from '../node';
import BlockquoteIcon from './blockquote.icon.svg';
import classes from './toolbar.module.scss';

const Button: RegularButtonConfig['Button'] = ({ editor, t }) => {
  const isActive = editor.isActive(BlockquoteNode.name);
  return (
    <button
      aria-label={t('blockquote-button.text')}
      data-testid="blockquote-button"
      disabled={!editor.can().toggleBlockquote()}
      className={classNames(classes.blockquoteButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().setParagraph().toggleBlockquote().run();
      }}
    >
      <BlockquoteIcon
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
  name: BlockquoteNode.name,
  text: 'blockquote-button.text',
  type: 'icon' as const,
  priority: 88,
};
