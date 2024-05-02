import { Resources } from '@rrte/i18n';
import type { ToolbarItem, BubbleMenuToolbar } from '@rrte/toolbar';
export type {
  RegularButtonConfig,
  RegularButtonParams,
  DropdownConfig,
  DropdownValue,
  ColorSelectionButtonConfig,
  ColorSelectionButtonParams,
  ModalButtonConfig,
  ModalButtonParams,
  InputIconButtonConfig,
  InputIconButtonParams,
  NumberControlConfig,
  NumberControlParams,
  ToolbarItem,
  BubbleMenuToolbar,
} from '@rrte/toolbar';
export { ToolbarItemType } from '@rrte/toolbar';

export type Config<T extends object> = Partial<{
  toolbar: ToolbarItem<T>;
  bubbleMenu: BubbleMenuToolbar<T>;
  translations: Resources;
}> &
  T;
