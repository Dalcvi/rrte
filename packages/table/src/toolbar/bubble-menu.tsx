import type { BubbleMenuToolbar } from '@rrte/common';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { TableNode } from '../table.node';
import AddColumn from './add-column.icon.svg';
import AddRow from './add-row.icon.svg';
import DeleteColumn from './delete-column.icon.svg';
import DeleteRow from './delete-row.icon.svg';
import classes from './table-bubble-menu.module.scss';
import { BubbleMenuWrapper, RegularButton } from '@rrte/toolbar';

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
    <BubbleMenuWrapper>
      <div className={classes.bubbleMenu}>
        <RegularButton
          Icon={({ className }) => (
            <AddColumn
              className={classNames(className, classes.horizontallyFlippedIcon)}
              height="20px"
              width="20px"
            />
          )}
          text={'table-add-column-before'}
          getIsActive={() => false}
          getIsDisabled={({ editor }) => !editor.can().addColumnBefore()}
          iconStyling="stroke"
          onClick={() => {
            editor.commands.addColumnBefore();
          }}
          editor={editor}
          config={{}}
        />
        <RegularButton
          Icon={({ className }) => <AddColumn className={className} height="20px" width="20px" />}
          text={'table-add-column-before'}
          getIsActive={() => false}
          getIsDisabled={({ editor }) => !editor.can().addColumnBefore()}
          iconStyling="stroke"
          onClick={() => {
            editor.commands.addColumnBefore();
          }}
          editor={editor}
          config={{}}
        />
        <RegularButton
          Icon={({ className }) => <AddRow className={className} height="20px" width="20px" />}
          text={'table-add-row-above'}
          getIsActive={() => false}
          getIsDisabled={({ editor }) => !editor.can().addRowBefore()}
          iconStyling="stroke"
          onClick={() => {
            editor.commands.addRowBefore();
          }}
          editor={editor}
          config={{}}
        />
        <RegularButton
          Icon={({ className }) => (
            <AddRow
              className={classNames(className, classes.verticallyFlippedIcon)}
              height="20px"
              width="20px"
            />
          )}
          text={'table-add-row-below'}
          getIsActive={() => false}
          getIsDisabled={({ editor }) => !editor.can().addColumnAfter()}
          iconStyling="stroke"
          onClick={() => {
            editor.commands.addColumnAfter();
          }}
          editor={editor}
          config={{}}
        />
        <RegularButton
          Icon={({ className }) => (
            <DeleteColumn
              className={classNames(className, classes.removeIcon)}
              height="20px"
              width="20px"
            />
          )}
          text={'table-delete-column'}
          getIsActive={() => false}
          getIsDisabled={({ editor }) => !editor.can().deleteColumn()}
          iconStyling="stroke"
          onClick={() => {
            editor.commands.deleteColumn();
          }}
          editor={editor}
          config={{}}
        />
        <RegularButton
          Icon={({ className }) => (
            <DeleteRow
              className={classNames(className, classes.removeIcon)}
              height="20px"
              width="20px"
            />
          )}
          text={'table-delete-row'}
          getIsActive={() => false}
          getIsDisabled={({ editor }) => !editor.can().deleteRow()}
          iconStyling="stroke"
          onClick={() => {
            editor.commands.deleteRow();
          }}
          editor={editor}
          config={{}}
        />
      </div>
    </BubbleMenuWrapper>
  );

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
