import { useTranslations } from '@rrte/i18n';
import type { Editor } from '@tiptap/react';
import classNames from 'classnames';
import { useMemo } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { ColorSelectionButton } from './color-selection-button';
import { Dropdown } from './dropdown';
import { InputIconButton } from './input-icon-button';
import { ModalButton } from './modal-button';
import { RegularButton } from './regular-button';
import classes from './toolbar.module.scss';
import { GroupedToolbars, SingleToolbarItem, ToolbarItemType } from './toolbar.types';
import {
  getConfigsMapByName,
  getDifferentToolbarTypes,
  getReducedMutliExtensions,
  groupToolbarItemsByGroup,
  sortByPriority,
} from './toolbar.utils';
import { NumberControl } from './number-control';

export const Toolbar = ({
  editor,
  items,
  editorContainerRef,
  wrapperClassName,
}: {
  editor: Editor;
  items: { toolbar: SingleToolbarItem<any>; config: any }[];
  editorContainerRef: HTMLElement | null;
  wrapperClassName?: string;
}) => {
  const configsByName = useMemo(() => getConfigsMapByName(items), [items]);
  const toolbarItems = useMemo(() => items.map(({ toolbar }) => toolbar), [items]);
  const groupedToolbars = useMemo(() => groupToolbarItemsByGroup(toolbarItems), [toolbarItems]);

  return (
    <>
      <Tooltip className={classes.toolbarTooltip} id="toolbar-buttons-tooltip" />
      <ul className={classNames(classes.groupedToolbars, wrapperClassName)}>
        {groupedToolbars.map(group => (
          <li className={classes.group} key={group.group.name}>
            <ToolbarGroup
              key={group.group.name}
              groupedToolbars={group}
              editor={editor}
              editorContainerRef={editorContainerRef}
              configsByName={configsByName}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

const ToolbarGroup = ({
  groupedToolbars,
  editor,
  editorContainerRef,
  configsByName,
  wrapperClassName,
}: {
  groupedToolbars: GroupedToolbars<any>;
  editor: Editor;
  editorContainerRef: HTMLElement | null;
  configsByName: Record<string, Record<string, any>>;
  wrapperClassName?: string;
}) => {
  const { t } = useTranslations();
  const { toolbars } = groupedToolbars;
  const itemsSortedByType = useMemo(() => getDifferentToolbarTypes(toolbars), [toolbars]);
  const reducedDropdowns = useMemo(
    () => getReducedMutliExtensions(itemsSortedByType[ToolbarItemType.DROPDOWN]),
    [itemsSortedByType]
  );

  const itemsWithoutDropdowns = useMemo(() => {
    const { [ToolbarItemType.DROPDOWN]: _, ...rest } = itemsSortedByType;
    return rest;
  }, [itemsSortedByType]);

  const sortedButtons = useMemo(
    () => sortByPriority([...Object.values(itemsWithoutDropdowns).flat(), ...reducedDropdowns]),
    [itemsSortedByType]
  );

  return (
    <ul
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="toolbar"
      aria-orientation="horizontal"
      aria-label={t(groupedToolbars.group.text)}
      className={classNames(classes.toolbarList, wrapperClassName)}
    >
      {sortedButtons.map(item => {
        switch (item.type) {
          case ToolbarItemType.ICON:
            return (
              <li
                key={item.name}
                data-tooltip-id="toolbar-buttons-tooltip"
                data-tooltip-content={t(item.text)}
              >
                <RegularButton editor={editor} {...item} config={configsByName[item.name]} />
              </li>
            );
          case ToolbarItemType.DROPDOWN:
            return (
              <li
                key={item.name}
                data-tooltip-id="toolbar-buttons-tooltip"
                data-tooltip-content={t(item.text)}
              >
                <Dropdown editor={editor} {...item} configs={configsByName} />
              </li>
            );
          case ToolbarItemType.COLOR_SELECTION:
            return (
              <li key={item.name}>
                <ColorSelectionButton editor={editor} {...item} />
              </li>
            );
          case ToolbarItemType.MODAL:
            return (
              <li
                data-tooltip-id="toolbar-buttons-tooltip"
                data-tooltip-content={t(item.text)}
                key={item.name}
              >
                <ModalButton editor={editor} config={configsByName[item.name]} {...item} />
              </li>
            );
          case ToolbarItemType.INPUT_ICON:
            return (
              <li
                data-tooltip-id="toolbar-buttons-tooltip"
                data-tooltip-content={t(item.text)}
                key={item.name}
              >
                <InputIconButton editor={editor} config={configsByName[item.name]} {...item} />
              </li>
            );
          case ToolbarItemType.CUSTOM_LOGIC:
            return (
              <li
                data-tooltip-id="toolbar-buttons-tooltip"
                data-tooltip-content={t(item.text)}
                key={item.name}
              >
                <item.Component editor={editor} editorContainerRef={editorContainerRef} />
              </li>
            );
          case ToolbarItemType.NUMBER_CONTROL:
            return (
              <li key={item.name}>
                <NumberControl editor={editor} {...item} />
              </li>
            );
          default:
            console.warn(`${JSON.stringify(item)} is not implemented yet`);
        }
      })}
    </ul>
  );
};
