import type { RegularButtonConfig } from '@rrte/common';
import classNames from 'classnames';
import { LinkMark } from '../mark';
import LinkIcon from './link.icon.svg';
import classes from './toolbar.module.scss';

const Button: RegularButtonConfig['Button'] = ({ editor, t }) => {
  const isActive = editor.isActive(LinkMark.name);
  const currentHref = editor.getAttributes(LinkMark.name)?.href ?? '';
  return (
    <button
      data-testid="link-button"
      aria-label={t('link-button.text')}
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
  text: 'link-button.text',
  type: 'icon' as const,
  priority: 85,
};
