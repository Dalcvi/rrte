import type { RegularButtonConfig } from './regular-button';
import type { DropdownConfig, DropdownValue } from './dropdown';
export type { RegularButtonConfig, DropdownConfig, DropdownValue };

export const ToolbarItemType = {
  ICON: 'icon',
  DROPDOWN: 'dropdown',
} as const;

export type RowProps = {
  color?: string;
};

export type SortedToolbarItems = {
  [ToolbarItemType.ICON]: RegularButtonConfig[];
  [ToolbarItemType.DROPDOWN]: DropdownConfig[];
};

export type ToolbarItem = SingleToolbarItem | SingleToolbarItem[];
export type SingleToolbarItem = RegularButtonConfig | DropdownConfig;
