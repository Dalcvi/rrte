import type { BubbleMenuToolbar } from '@rrte/common';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { TableNode } from '../table.node';
import AddColumn from './add-column.icon.svg';
import AddRow from './add-row.icon.svg';
import DeleteColumn from './delete-column.icon.svg';
import DeleteRow from './delete-row.icon.svg';
import classes from './gif-bubble-menu.module.scss';

const BubbleMenu: BubbleMenuToolbar['Menu'] = ({ editor, t }) => {
  const [maxWidth, setMaxWidth] = useState(0);

  useEffect(() => {
    const editorElement = document.querySelector("[data-testid='rrte-editor']") as HTMLElement;
    if (!editorElement || !window) {
      return;
    }
    const observer = new ResizeObserver(entries => {
      const maxWidth = entries[0].contentRect.width;
      setMaxWidth(maxWidth);
    });
    observer.observe(editorElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={classes.bubbleMenu} style={{ maxWidth: `${maxWidth}px` }}>
      <button
        data-testid="add-table-column-before"
        aria-label={t('table-add-column-before')}
        className={classNames(classes.button)}
        disabled={!editor.can().addColumnBefore()}
        onClick={() => {
          editor.commands.addColumnBefore();
        }}
      >
        <AddColumn
          width="20px"
          height="20px"
          className={classNames(classes.horizontallyFlippedIcon)}
        />
      </button>
      <button
        data-testid="add-table-column-after"
        aria-label={t('table-add-column-after')}
        className={classNames(classes.button)}
        disabled={!editor.can().addColumnAfter()}
        onClick={() => {
          editor.commands.addColumnAfter();
        }}
      >
        <AddColumn width="20px" height="20px" className={classNames(classes.icon)} />
      </button>
      <button
        data-testid="add-table-row-above"
        aria-label={t('table-add-row-above')}
        className={classNames(classes.button)}
        disabled={!editor.can().addRowBefore()}
        onClick={() => {
          editor.commands.addRowBefore();
        }}
      >
        <AddRow width="20px" height="20px" className={classNames(classes.verticallyFlippedIcon)} />
      </button>
      <button
        data-testid="add-table-row-below"
        aria-label={t('table-add-row-below')}
        className={classNames(classes.button)}
        disabled={!editor.can().addRowAfter()}
        onClick={() => {
          editor.commands.addRowAfter();
        }}
      >
        <AddRow width="20px" height="20px" className={classNames(classes.icon)} />
      </button>
      <button
        data-testid="remove-table-column"
        aria-label={t('table-delete-column')}
        className={classNames(classes.button)}
        disabled={!editor.can().deleteColumn()}
        onClick={() => {
          editor.commands.deleteColumn();
        }}
      >
        <DeleteColumn width="20px" height="20px" className={classNames(classes.removeIcon)} />
      </button>
      <button
        data-testid="remove-table-row"
        aria-label={t('table-delete-row')}
        className={classNames(classes.button)}
        disabled={!editor.can().deleteRow()}
        onClick={() => {
          editor.commands.deleteRow();
        }}
      >
        <DeleteRow width="20px" height="20px" className={classNames(classes.removeIcon)} />
      </button>
    </div>
  );
};

export const TableBubbleMenu: BubbleMenuToolbar = {
  Menu: BubbleMenu,
  shouldShow: ({ editor }) => {
    return editor.isActive(TableNode.name);
  },
};
