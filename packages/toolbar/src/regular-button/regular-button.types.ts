import { Editor } from '@tiptap/react';
import { ToolbarGroup, ToolbarItemType } from '../toolbar.types';

export type RegularButtonConfig<T extends Record<string, any> = Record<string, any>> = {
  name: string;
  type: typeof ToolbarItemType.ICON;
  text: string;
  Icon: React.FC<{ className: string }>;
  onClick: (params: RegularButtonParams<T>) => void;
  getIsActive: (params: RegularButtonParams<T>) => boolean;
  getIsDisabled: (params: RegularButtonParams<T>) => boolean;
  priority: number;
  iconStyling: 'fill' | 'stroke';
  group: ToolbarGroup;
};

export type RegularButtonParams<T extends Record<string, any>> = {
  editor: Editor;
  config: T;
};
