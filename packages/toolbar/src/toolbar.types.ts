import type { RegularButtonConfig } from './regular-button';
import type { DropdownConfig, DropdownValue } from './dropdown';
import { Editor, BubbleMenuProps } from '@tiptap/react';
export type { RegularButtonConfig, DropdownConfig, DropdownValue };

export const ToolbarItemType = {
  ICON: 'icon',
  DROPDOWN: 'dropdown',
} as const;

export type RowProps = {
  color?: string;
};

export type SortedToolbarItems<T extends Record<string, any>> = {
  [ToolbarItemType.ICON]: RegularButtonConfig<T>[];
  [ToolbarItemType.DROPDOWN]: DropdownConfig[];
};

export type ToolbarItem<T extends Record<string, any>> =
  | SingleToolbarItem<T>
  | SingleToolbarItem<T>[];
export type SingleToolbarItem<T extends Record<string, any>> =
  | RegularButtonConfig<T>
  | DropdownConfig;

export type BubbleMenuToolbarProps<T extends Record<string, any> = Record<string, any>> = {
  editor: Editor;
  config: T;
};

export type BubbleMenuToolbar<T extends Record<string, any> = Record<string, any>> = {
  Menu: (props: BubbleMenuToolbarProps<T>) => JSX.Element;
} & Omit<BubbleMenuProps, 'editor' | 'children'>;
