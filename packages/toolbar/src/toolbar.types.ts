import { BubbleMenuProps, Editor } from '@tiptap/react';
import type { DropdownConfig, DropdownValue } from './dropdown';
import type { RegularButtonConfig } from './regular-button';
import { ColorSelectionButtonConfig } from './color-selection-button';
import { ModalButtonConfig } from './modal-button';
import { InputIconButtonConfig } from './input-icon-button';
import { CustomLogicButtonConfig } from './custom-logic-button';
import { NumberControlConfig } from './number-control';
export type { DropdownConfig, DropdownValue, RegularButtonConfig };

export const ToolbarItemType = {
  ICON: 'icon',
  DROPDOWN: 'dropdown',
  COLOR_SELECTION: 'color-selection',
  MODAL: 'modal',
  INPUT_ICON: 'input-icon',
  CUSTOM_LOGIC: 'custom-logic',
  NUMBER_CONTROL: 'number-control',
} as const;

export type RowProps = {
  color?: string;
};

export type SortedToolbarItems<T extends Record<string, any>> = {
  [ToolbarItemType.ICON]: RegularButtonConfig<T>[];
  [ToolbarItemType.DROPDOWN]: DropdownConfig<T>[];
  [ToolbarItemType.COLOR_SELECTION]: ColorSelectionButtonConfig[];
  [ToolbarItemType.MODAL]: ModalButtonConfig<T>[];
  [ToolbarItemType.INPUT_ICON]: InputIconButtonConfig<T>[];
  [ToolbarItemType.CUSTOM_LOGIC]: CustomLogicButtonConfig[];
  [ToolbarItemType.NUMBER_CONTROL]: NumberControlConfig[];
};

export type ToolbarItem<T extends Record<string, any>> =
  | SingleToolbarItem<T>
  | SingleToolbarItem<T>[];

export type SingleToolbarItem<T extends Record<string, any>> =
  | RegularButtonConfig<T>
  | DropdownConfig<T>
  | ColorSelectionButtonConfig
  | ModalButtonConfig<T>
  | InputIconButtonConfig<T>
  | CustomLogicButtonConfig
  | NumberControlConfig;

export type GroupedToolbars<T extends Record<string, any>> = {
  toolbars: SingleToolbarItem<T>[];
  group: ToolbarGroup;
};

export type BubbleMenuToolbarProps<T extends Record<string, any> = Record<string, any>> = {
  editor: Editor;
  config: T;
  t: (key: string) => string;
};

export type BubbleMenuToolbar<T extends Record<string, any> = Record<string, any>> = {
  Menu: (props: BubbleMenuToolbarProps<T>) => JSX.Element;
  tippyOptions?: (editor: Editor) => BubbleMenuProps['tippyOptions'];
} & Omit<BubbleMenuProps, 'editor' | 'children' | 'tippyOptions'>;

export type ToolbarItemBase = {
  name: string;
  text: string;
  priority: number;
  group: ToolbarGroup;
};

export type ToolbarGroup = {
  name: string;
  text: string;
  priority: number;
  toolbar: 'main' | 'footer';
};
