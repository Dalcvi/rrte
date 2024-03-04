import type { ToolbarItem, BubbleMenuToolbar } from '@rrte/toolbar';
export type {
  RegularButtonConfig,
  RegularButtonWrapperProps,
  DropdownConfig,
  DropdownValue,
  ToolbarItem,
  BubbleMenuToolbar,
} from '@rrte/toolbar';
export { ToolbarItemType } from '@rrte/toolbar';

export type Config<T extends object> = Partial<{
  toolbar: ToolbarItem<T>;
  bubbleMenu: BubbleMenuToolbar<T>;
}> &
  T;
