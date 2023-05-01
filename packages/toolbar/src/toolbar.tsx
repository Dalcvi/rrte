import type { Editor } from '@tiptap/react';
import { ToolbarItem, ToolbarItemType } from './toolbar.types';
import { RegularButton } from './regular-button';
import { useMemo } from 'react';
import {
  getDifferentToolbarTypes,
  getReducedMutliExtensions,
  sortByPriority,
  spreadToolbarItems,
} from './toolbar.utils';
import { Dropdown } from './dropdown';
import classes from './toolbar.module.scss';

export const Toolbar = ({ editor, items }: { editor: Editor; items: ToolbarItem[] }) => {
  const spreadedItems = useMemo(() => spreadToolbarItems(items), [items]);
  const itemsSortedByType = useMemo(() => getDifferentToolbarTypes(spreadedItems), [items]);
  const reducedDropdowns = useMemo(
    () => getReducedMutliExtensions(itemsSortedByType[ToolbarItemType.DROPDOWN]),
    [itemsSortedByType],
  );
  const sortedButtons = useMemo(
    () => sortByPriority([...itemsSortedByType[ToolbarItemType.ICON], ...reducedDropdowns]),
    [],
  );

  return (
    <div className={classes.toolbarList}>
      {sortedButtons.map((item) => {
        switch (item.type) {
          case ToolbarItemType.ICON:
            return <RegularButton key={item.name} editor={editor} {...item} />;
          case ToolbarItemType.DROPDOWN:
            return <Dropdown key={item.name} editor={editor} {...item} />;
          default:
            console.warn(`${JSON.stringify(item)} is not implemented yet`);
        }
      })}
    </div>
  );
};
