import type { RegularButtonConfig } from '@rrte/common';
import LinkIcon from './link.icon.svg';
import { LinkMark } from '../mark';
import { Editor } from '@tiptap/core';
import classNames from 'classnames';
import classes from './toolbar.module.scss';

const Button = ({ editor }: { editor: Editor }) => {
  const isActive = editor.isActive(LinkMark.name);
  const currentHref = editor.getAttributes(LinkMark.name)?.href ?? '';
  return (
    <button
      data-testid="link-button"
      disabled={!editor.can().toggleLink({ href: currentHref })}
      className={classNames(classes.linkButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().toggleLink({ href: currentHref }).run();
      }}
    >
      <LinkIcon
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
  name: LinkMark.name,
  text: 'Link',
  type: 'icon' as const,
  priority: 1,
};
