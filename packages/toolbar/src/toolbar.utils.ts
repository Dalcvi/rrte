import {
  DropdownConfig,
  GroupedToolbars,
  SingleToolbarItem,
  SortedToolbarItems,
  ToolbarItemType,
} from './toolbar.types';

export const getConfigsMapByName = (
  toolbarInfos: { toolbar: SingleToolbarItem<any>; config: Record<string, any> }[]
): { [key: string]: Record<string, any> } => {
  return toolbarInfos
    .map(({ toolbar, config }) => ({
      name: toolbar.name,
      config,
    }))
    .reduce((acc, { name, config }) => ({ ...acc, [name]: config }), {});
};

export const groupToolbarItemsByGroup = (
  items: SingleToolbarItem<any>[]
): GroupedToolbars<any>[] => {
  const groups = items.reduce(
    (acc, item) => {
      return {
        ...acc,
        [item.group.name]: [...(acc[item.group.name] || []), item],
      };
    },
    {} as { [key: string]: SingleToolbarItem<any>[] }
  );

  return Object.values(groups)
    .map(toolbars => ({
      toolbars,
      group: toolbars.sort((a, b) => b.group.priority - a.group.priority)[0].group,
    }))
    .sort((a, b) => b.group.priority - a.group.priority);
};

export const getDifferentToolbarTypes = (
  items: SingleToolbarItem<any>[]
): SortedToolbarItems<any> => {
  const toolbarItemNames = Object.values(ToolbarItemType);
  const defaults = toolbarItemNames.reduce((acc, name) => {
    return {
      ...acc,
      [name]: [],
    };
  }, {} as SortedToolbarItems<any>);
  return items.reduce(
    (acc, item) => ({
      ...acc,
      [item.type]: [...(acc[item.type] || []), item],
    }),
    defaults as SortedToolbarItems<any>
  );
};

export const sortByPriority = <T>(items: T & { priority: number }[]): T => {
  return items.sort((a, b) => b.priority - a.priority);
};

export const getReducedMutliExtensions = (items: DropdownConfig[]): DropdownConfig[] => {
  const dropdownsGroupedByName = items.reduce(
    (acc, item) => ({
      ...acc,
      [item.dropdownName]: [...(acc[item.dropdownName] || []), item],
    }),
    {} as { [key: string]: DropdownConfig[] }
  );

  return Object.values(dropdownsGroupedByName)
    .map(groupedItems => reduceMultiExtensionValuesIntoOne(groupedItems))
    .filter((item): item is DropdownConfig => !!item);
};
export const reduceMultiExtensionValuesIntoOne = (
  items: DropdownConfig[]
): DropdownConfig | undefined => {
  if (items.length === 0) {
    return undefined;
  }

  if (items.length === 1) {
    return items[0];
  }

  const values = items.flatMap(item => item.values);
  const biggestPriorityDropdown = items.reduce((acc, item) =>
    item.DropdownPriority > acc.DropdownPriority ? item : acc
  );

  return {
    ...biggestPriorityDropdown,
    values,
  };
};
