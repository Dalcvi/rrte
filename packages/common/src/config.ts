import type { ToolbarItem } from '@rrte/toolbar';
export type { RegularButtonConfig, RegularButtonWrapperProps, DropdownConfig, DropdownValue } from '@rrte/toolbar';
export { ToolbarItemType } from '@rrte/toolbar';

export type Config = Partial<{
  toolbar: ToolbarItem;
  bubbleMenu: ToolbarItem;
}>;
