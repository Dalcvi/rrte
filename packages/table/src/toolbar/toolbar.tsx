import type { RegularButtonConfig } from '@rrte/common';
import classNames from 'classnames';
import { TableNode } from '../table.node';
import TableIcon from './table.icon.svg';
import classes from './toolbar.module.scss';

const Button: RegularButtonConfig['Button'] = ({ editor, t }) => {
  const isActive = editor.isActive(TableNode.name);

  return (
    <button
      aria-label={t('table-button.text')}
      data-testid="table-button"
      disabled={!editor.can().insertTable()}
      className={classNames(classes.tableButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.commands.insertTable();
      }}
    >
      <TableIcon
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
  name: TableNode.name,
  text: 'table-button.text',
  type: 'icon' as const,
  priority: 88,
};
