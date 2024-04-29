import type { Editor } from '@tiptap/react';
import { ToolbarItem, ToolbarItemType } from './toolbar.types';
import { RegularButton } from './regular-button';
import { useMemo } from 'react';
import {
  getConfigsMapByName,
  getDifferentToolbarTypes,
  getReducedMutliExtensions,
  sortByPriority,
  spreadToolbarItems,
} from './toolbar.utils';
import { Dropdown } from './dropdown';
import classes from './toolbar.module.scss';
import classNames from 'classnames';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export const Toolbar = ({
  editor,
  items,
  editorContainerRef,
  wrapperClassName,
}: {
  editor: Editor;
  items: { toolbar: ToolbarItem<any>; config: any }[];
  editorContainerRef: HTMLElement | null;
  wrapperClassName?: string;
}) => {
  const configsByName = useMemo(() => getConfigsMapByName(items), [items]);
  const toolbarItems = useMemo(() => items.map(({ toolbar }) => toolbar), [items]);
  const spreadedItems = useMemo(() => spreadToolbarItems(toolbarItems), [items]);
  const itemsSortedByType = useMemo(() => getDifferentToolbarTypes(spreadedItems), [items]);
  const reducedDropdowns = useMemo(
    () => getReducedMutliExtensions(itemsSortedByType[ToolbarItemType.DROPDOWN]),
    [itemsSortedByType]
  );

  const sortedButtons = useMemo(
    () => sortByPriority([...itemsSortedByType[ToolbarItemType.ICON], ...reducedDropdowns]),
    [itemsSortedByType]
  );
  return (
    <ul
      // role="toolbar"
      // aria-orientation="horizontal"
      className={classNames(classes.toolbarList, wrapperClassName)}
    >
      {sortedButtons.length > 0 && (
        <Tooltip className={classes.toolbarTooltip} id="toolbar-buttons-tooltip" />
      )}
      {sortedButtons.map(item => {
        switch (item.type) {
          case ToolbarItemType.ICON:
            return (
              <li>
                <RegularButton
                  key={item.name}
                  editor={editor}
                  {...item}
                  config={configsByName[item.name]}
                  editorContainerRef={editorContainerRef}
                />
              </li>
            );
          case ToolbarItemType.DROPDOWN:
            return (
              <li>
                <Dropdown key={item.name} editor={editor} {...item} />
              </li>
            );
          default:
            console.warn(`${JSON.stringify(item)} is not implemented yet`);
        }
      })}
    </ul>
  );
};
