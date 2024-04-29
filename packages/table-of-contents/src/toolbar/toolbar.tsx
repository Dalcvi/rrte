import type { RegularButtonConfig } from '@rrte/common';
import classNames from 'classnames';
import { TableOfContentsNode } from '../node';
import TableOfContentsIcon from './table-of-contents.icon.svg';
import classes from './toolbar.module.scss';

const Button: RegularButtonConfig['Button'] = ({ editor, t }) => {
  const isActive = editor.isActive(TableOfContentsNode.name);
  return (
    <button
      aria-label={t('table-of-contents-button.text')}
      data-testid="table-of-contents-button"
      className={classNames(classes.tableOfContentsButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        if (isActive) {
          editor.chain().focus().removeTableOfContents().run();
        }
        editor.chain().focus().setTableOfContents().run();
      }}
    >
      <TableOfContentsIcon
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
  name: TableOfContentsNode.name,
  text: 'table-of-contents-button.text',
  type: 'icon' as const,
  priority: 96,
};
