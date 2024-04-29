import {
  callOrReturn,
  Editor,
  getExtensionField,
  mergeAttributes,
  Node,
  ParentConfig,
} from '@tiptap/core';
import { DOMOutputSpec } from '@tiptap/pm/model';
import { TextSelection } from '@tiptap/pm/state';
import {
  addColumnAfter,
  addColumnBefore,
  addRowAfter,
  addRowBefore,
  CellSelection,
  columnResizing,
  deleteColumn,
  deleteRow,
  deleteTable,
  fixTables,
  goToNextCell,
  mergeCells,
  setCellAttr,
  splitCell,
  tableEditing,
  toggleHeader,
  toggleHeaderCell,
} from '@tiptap/pm/tables';

import { createColGroup } from './create-col-group';
import { createTable } from './create-table';
import { removeAllCells } from './remove-all-cells';
import { TableRowNode } from './table-row.node';
import { TableView } from './table-view';

export interface TableOptions {
  HTMLAttributes: Record<string, any>;
  resizable: boolean;
  handleWidth: number;
  cellMinWidth: number;
  View: typeof TableView;
  lastColumnResizable: boolean;
  allowTableNodeSelection: boolean;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    table: {
      insertTable: (options?: {
        rows?: number;
        cols?: number;
        withHeaderRow?: boolean;
      }) => ReturnType;
      addColumnBefore: () => ReturnType;
      addColumnAfter: () => ReturnType;
      deleteColumn: () => ReturnType;
      addRowBefore: () => ReturnType;
      addRowAfter: () => ReturnType;
      deleteRow: () => ReturnType;
      deleteTable: () => ReturnType;
      mergeCells: () => ReturnType;
      splitCell: () => ReturnType;
      toggleHeaderColumn: () => ReturnType;
      toggleHeaderRow: () => ReturnType;
      toggleHeaderCell: () => ReturnType;
      mergeOrSplit: () => ReturnType;
      setCellAttribute: (name: string, value: any) => ReturnType;
      goToNextCell: () => ReturnType;
      goToPreviousCell: () => ReturnType;
      fixTables: () => ReturnType;
      setCellSelection: (position: { anchorCell: number; headCell?: number }) => ReturnType;
    };
  }

  interface NodeConfig<Options, Storage> {
    /**
     * Table Role
     */
    tableRole?:
      | string
      | ((this: {
          name: string;
          options: Options;
          storage: Storage;
          parent: ParentConfig<NodeConfig<Options>>['tableRole'];
        }) => string);
  }
}

export const TableNode = Node.create<TableOptions>({
  name: 'table',

  addOptions() {
    return {
      HTMLAttributes: {},
      resizable: true,
      handleWidth: 5,
      cellMinWidth: 25,
      View: TableView,
      lastColumnResizable: true,
      allowTableNodeSelection: false,
    };
  },

  content: `${TableRowNode.name}+`,

  speechCommands: t => {
    return [
      {
        group: t('voice-group.table'),
        activationKeyword: t('voice-command.add-table'),
        command: 'insertTable',
        description: 'Insert a table',
      },
      {
        group: t('voice-group.table'),
        activationKeyword: t('voice-command.add-column-before'),
        command: 'addColumnBefore',
        description: 'Add a column before',
      },
      {
        group: t('voice-group.table'),
        activationKeyword: t('voice-command.add-column-after'),
        command: 'addColumnAfter',
        description: 'Add a column after',
      },
      {
        group: t('voice-group.table'),
        activationKeyword: t('voice-command.remove-column'),
        command: 'deleteColumn',
        description: 'Delete a column',
      },
      {
        group: t('voice-group.table'),
        activationKeyword: t('voice-command.add-row-before'),
        command: 'addRowBefore',
        description: 'Add a row before',
      },
      {
        group: t('voice-group.table'),
        activationKeyword: t('voice-command.add-row-after'),
        command: 'addRowAfter',
        description: 'Add a row after',
      },
      {
        group: t('voice-group.table'),
        activationKeyword: t('voice-command.remove-row'),
        command: 'deleteRow',
        description: 'Delete a row',
      },
      {
        group: t('voice-group.table'),
        activationKeyword: t('voice-command.remove-table'),
        command: 'deleteTable',
        description: 'Delete the table',
      },
      {
        group: t('voice-group.table'),
        activationKeyword: t('voice-command.merge-cells'),
        command: 'mergeCells',
        description: 'Merge cells',
      },
      {
        group: t('voice-group.table'),
        activationKeyword: t('voice-command.split-cell'),
        command: 'splitCell',
        description: 'Split a cell',
      },
      {
        group: t('voice-group.table'),
        activationKeyword: t('voice-command.toggle-header-column'),
        command: 'toggleHeaderColumn',
        description: 'Toggle header column',
      },
      {
        group: t('voice-group.table'),
        activationKeyword: t('voice-command.toggle-header-row'),
        command: 'toggleHeaderRow',
        description: 'Toggle header row',
      },
      {
        group: t('voice-group.table'),
        activationKeyword: t('voice-command.toggle-header-cell'),
        command: 'toggleHeaderCell',
        description: 'Toggle header cell',
      },
    ];
  },

  tableRole: 'table',

  testing: {
    'insert table': ({ editor }: { editor: Editor }) => {
      editor.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: true });
    },
  },

  isolating: true,

  group: 'block',

  parseHTML() {
    return [{ tag: 'table' }];
  },

  renderHTML({ node, HTMLAttributes }) {
    const { colgroup, tableWidth, tableMinWidth } = createColGroup(node, this.options.cellMinWidth);

    const table: DOMOutputSpec = [
      'table',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        style: tableWidth ? `width: ${tableWidth}` : `minWidth: ${tableMinWidth}`,
      }),
      colgroup,
      ['tbody', 0],
    ];

    return table;
  },

  addCommands() {
    return {
      insertTable:
        ({ rows = 3, cols = 3, withHeaderRow = true } = {}) =>
        ({ tr, dispatch, editor }) => {
          const node = createTable(editor.schema, rows, cols, withHeaderRow);

          if (dispatch) {
            const offset = tr.selection.anchor + 1;

            tr.replaceSelectionWith(node)
              .scrollIntoView()
              .setSelection(TextSelection.near(tr.doc.resolve(offset)));
          }

          return true;
        },
      addColumnBefore:
        () =>
        ({ state, dispatch }) => {
          return addColumnBefore(state, dispatch);
        },
      addColumnAfter:
        () =>
        ({ state, dispatch }) => {
          return addColumnAfter(state, dispatch);
        },
      deleteColumn:
        () =>
        ({ state, dispatch }) => {
          return deleteColumn(state, dispatch);
        },
      addRowBefore:
        () =>
        ({ state, dispatch }) => {
          return addRowBefore(state, dispatch);
        },
      addRowAfter:
        () =>
        ({ state, dispatch }) => {
          return addRowAfter(state, dispatch);
        },
      deleteRow:
        () =>
        ({ state, dispatch }) => {
          return deleteRow(state, dispatch);
        },
      deleteTable:
        () =>
        ({ state, dispatch }) => {
          return deleteTable(state, dispatch);
        },
      mergeCells:
        () =>
        ({ state, dispatch }) => {
          return mergeCells(state, dispatch);
        },
      splitCell:
        () =>
        ({ state, dispatch }) => {
          return splitCell(state, dispatch);
        },
      toggleHeaderColumn:
        () =>
        ({ state, dispatch }) => {
          return toggleHeader('column')(state, dispatch);
        },
      toggleHeaderRow:
        () =>
        ({ state, dispatch }) => {
          return toggleHeader('row')(state, dispatch);
        },
      toggleHeaderCell:
        () =>
        ({ state, dispatch }) => {
          return toggleHeaderCell(state, dispatch);
        },
      mergeOrSplit:
        () =>
        ({ state, dispatch }) => {
          if (mergeCells(state, dispatch)) {
            return true;
          }

          return splitCell(state, dispatch);
        },
      setCellAttribute:
        (name, value) =>
        ({ state, dispatch }) => {
          return setCellAttr(name, value)(state, dispatch);
        },
      goToNextCell:
        () =>
        ({ state, dispatch }) => {
          return goToNextCell(1)(state, dispatch);
        },
      goToPreviousCell:
        () =>
        ({ state, dispatch }) => {
          return goToNextCell(-1)(state, dispatch);
        },
      fixTables:
        () =>
        ({ state, dispatch }) => {
          if (dispatch) {
            fixTables(state);
          }

          return true;
        },
      setCellSelection:
        position =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            const selection = CellSelection.create(tr.doc, position.anchorCell, position.headCell);

            tr.setSelection(selection);
          }

          return true;
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      Tab: () => {
        if (this.editor.commands.goToNextCell()) {
          return true;
        }

        if (!this.editor.can().addRowAfter()) {
          return false;
        }

        return this.editor.chain().addRowAfter().goToNextCell().run();
      },
      'Shift-Tab': () => this.editor.commands.goToPreviousCell(),
      Backspace: removeAllCells,
      'Mod-Backspace': removeAllCells,
      Delete: removeAllCells,
      'Mod-Delete': removeAllCells,
    };
  },

  addProseMirrorPlugins() {
    const isResizable = this.options.resizable && this.editor.isEditable;

    return [
      ...(isResizable
        ? [
            columnResizing({
              handleWidth: this.options.handleWidth,
              cellMinWidth: this.options.cellMinWidth,
              View: this.options.View,
              lastColumnResizable: this.options.lastColumnResizable,
            }),
          ]
        : []),
      tableEditing({
        allowTableNodeSelection: this.options.allowTableNodeSelection,
      }),
    ];
  },

  extendNodeSchema(extension) {
    const context = {
      name: extension.name,
      options: extension.options,
      storage: extension.storage,
    };

    return {
      tableRole: callOrReturn(getExtensionField(extension, 'tableRole', context)),
      // testing: getExtensionField(extension, 'testing', context),
    };
  },
});
