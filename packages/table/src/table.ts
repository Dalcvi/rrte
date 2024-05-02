import { createNode } from '@rrte/common';
import { TableNode } from './table.node';
import { TableRowNode } from './table-row.node';
import { TableHeaderNode } from './table-header.node';
import { TableCellNode } from './table-cell.node';
import classes from './table.scss';
import { TableBubbleMenu, ToolbarButton } from './toolbar';

const fakeForInjections = {
  classesLength: classes?.length ?? 0,
};

fakeForInjections['classesLength'] = fakeForInjections['classesLength'];

export const Table = () =>
  createNode(TableNode, {
    toolbar: ToolbarButton,
    bubbleMenu: TableBubbleMenu,
    translations: {
      en: {
        'table-button.text': 'Add table',
        'table-add-column-before': 'Add column before',
        'table-add-column-after': 'Add column after',
        'table-add-row-above': 'Add row above',
        'table-add-row-below': 'Add row below',
        'table-delete-column': 'Delete column',
        'table-delete-row': 'Delete row',
        'voice-command.add-table': 'add table',
        'voice-command.add-row-before': 'add row before',
        'voice-command.add-row-after': 'add row after',
        'voice-command.add-column-before': 'add column before',
        'voice-command.add-column-after': 'add column after',
        'voice-command.remove-row': 'remove row',
        'voice-command.remove-column': 'remove column',
        'voice-command.remove-table': 'remove table',
        'voice-command.merge-cells': 'merge cells',
        'voice-command.split-cell': 'split cell',
        'voice-command.toggle-header-column': 'toggle header column',
        'voice-command.toggle-header-row': 'toggle header row',
        'voice-command.toggle-header-cell': 'toggle header cell',
        'media-group.text': 'Footer toolbar',
      },
      lt: {
        'table-button.text': 'Pridėti lentelę',
        'table-add-column-before': 'Pridėti stulpelį prieš',
        'table-add-column-after': 'Pridėti stulpelį po',
        'table-add-row-above': 'Pridėti eilutę prieš',
        'table-add-row-below': 'Pridėti eilutę po',
        'table-delete-column': 'Ištrinti stulpelį',
        'table-delete-row': 'Ištrinti eilutę',
        'voice-command.add-table': 'pridėti lentelę',
        'voice-command.add-row-before': 'pridėti eilutę prieš',
        'voice-command.add-row-after': 'pridėti eilutę po',
        'voice-command.add-column-before': 'pridėti stulpelį prieš',
        'voice-command.add-column-after': 'pridėti stulpelį po',
        'voice-command.remove-row': 'ištrinti eilutę',
        'voice-command.remove-column': 'ištrinti stulpelį',
        'voice-command.remove-table': 'ištrinti lentelę',
        'voice-command.merge-cells': 'sujungti langelius',
        'voice-command.split-cell': 'padalinti langelį',
        'voice-command.toggle-header-column': 'pakeisti stulpelio antraštę',
        'voice-command.toggle-header-row': 'pakeisti eilutės antraštę',
        'voice-command.toggle-header-cell': 'pakeisti langelio antraštę',
        'media-group.text': 'Apatinis įrankių juostelės elementas',
      },
    },
  });
export const TableRow = () => createNode(TableRowNode, {});
export const TableHeader = () => createNode(TableHeaderNode, {});
export const TableCell = () => createNode(TableCellNode, {});
