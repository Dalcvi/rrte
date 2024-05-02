# Table

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/table
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/table
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/table
```

  </TabItem>
</Tabs>

## Options

| Option name             | Type                    | description                                         |
| ----------------------- | ----------------------- | --------------------------------------------------- |
| HTMLAttributes          | _Record\<string, any\>_ | HTML attributes to be applied to the table element. |
| resizable               | _boolean_               | Whether the table should be resizable               |
| handleWidth             | _number_                | Width of the resizable handle                       |
| cellMinWidth            | _number_                | Minimum width of a cell                             |
| View                    | _typeof TableView_      | The view to be used for rendering the table         |
| lastColumnResizable     | _boolean_               | Whether the last column should be resizable         |
| allowTableNodeSelection | _boolean_               | Whether the table node should be selectable         |

## Functions

| Function name      | Parameters                                                   | Description                |
| ------------------ | ------------------------------------------------------------ | -------------------------- |
| insertTable        | \{ rows?: number; cols?: number; withHeaderRow?: boolean; \} | Inserts a new table        |
| addColumnBefore    | -                                                            | Adds a column before       |
| addColumnAfter     | -                                                            | Adds a column after        |
| deleteColumn       | -                                                            | Deletes a column           |
| addRowBefore       | -                                                            | Adds a row before          |
| addRowAfter        | -                                                            | Adds a row after           |
| deleteRow          | -                                                            | Deletes a row              |
| deleteTable        | -                                                            | Deletes the table          |
| mergeCells         | -                                                            | Merges selected cells      |
| splitCell          | -                                                            | Splits the selected cell   |
| toggleHeaderColumn | -                                                            | Toggles the column header  |
| toggleHeaderRow    | -                                                            | Toggles the row header     |
| toggleHeaderCell   | -                                                            | Toggles the cell header    |
| mergeOrSplit       | -                                                            | Merges or splits the cells |
| setCellAttribute   | name: string, value: any                                     | Sets the cell attribute    |
| goToNextCell       | -                                                            | Moves to the next cell     |
| goToPreviousCell   | -                                                            | Moves to the previous cell |
| fixTables          | -                                                            | Fixes the tables           |
| setCellSelection   | position: \{ anchorCell: number; headCell?: number \}        | Sets the cell selection    |

## Example

```jsx
import { Editor } from '@rrte/editor';
import { Table } from '@rrte/table';
import { Paragraph } from '@rrte/paragraph';

function MyComponent() {
  return <Editor content={undefined} editorExtensions={[Paragraph(), Table()]} />;
}
```

import TableExample from '@site/src/components/extension-table';

<TableExample />
