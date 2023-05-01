import {
  DropdownConfig,
  DropdownValue,
  SingleToolbarItem,
  SortedToolbarItems,
  ToolbarItem,
  ToolbarItemType,
} from './toolbar.types';

export const spreadToolbarItems = (items: ToolbarItem[]): SingleToolbarItem[] => {
  return items.reduce((acc: SingleToolbarItem[], item) => {
    if (Array.isArray(item)) {
      return [...acc, ...item];
    }
    return [...acc, item];
  }, [] as SingleToolbarItem[]);
};

export const getDifferentToolbarTypes = (items: SingleToolbarItem[]): SortedToolbarItems => {
  const toolbarItemNames = Object.values(ToolbarItemType);
  const defaults = toolbarItemNames.reduce((acc, name) => {
    return {
      ...acc,
      [name]: [],
    };
  }, {} as SortedToolbarItems);
  return items.reduce(
    (acc, item) => ({
      ...acc,
      [item.type]: [...(acc[item.type] || []), item],
    }),
    defaults as SortedToolbarItems,
  );
};

export const sortByPriority = <T>(items: T & { priority: number }[]): T => {
  return items.sort((a, b) => b.priority - a.priority);
};

export const getReducedMutliExtensions = (items: DropdownConfig[]): DropdownConfig[] => {
  const dropdownsGroupedByName = items.reduce((acc, item) => {
    return {
      ...acc,
      [item.name]: [...(acc[item.name] || []), item],
    };
  }, {} as { [key: string]: DropdownConfig[] });
  const names = Object.keys(dropdownsGroupedByName);
  return names.map((name) => reduceMultiExtensionValuesIntoOne(dropdownsGroupedByName[name]));
};

export const reduceMultiExtensionValuesIntoOne = (items: DropdownConfig[]): DropdownConfig => {
  const values = items.reduce((acc, item) => {
    return [...acc, ...item.values];
  }, [] as DropdownValue[]);

  const biggestPriorityDropdown = items.reduce((acc, item) => {
    if (item.DropdownPriority > acc.DropdownPriority) {
      return item;
    }
    return acc;
  });

  return {
    ...biggestPriorityDropdown,
    values,
  };
};
