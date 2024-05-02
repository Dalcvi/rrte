import { Editor } from '@tiptap/react';
import { ToolbarGroup, ToolbarItemType } from '../toolbar.types';

export type DropdownConfig<Config extends Record<string, any> = Record<string, any>> = {
  name: string;
  dropdownName: string;
  type: typeof ToolbarItemType.DROPDOWN;
  text: string;
  DropdownPriority: number;
  priority: number;
  values: DropdownValue<Config>[];
  group: ToolbarGroup;
};

export type DropdownValue<Config extends Record<string, any> = Record<string, any>> = {
  name: string;
  text: string;
  belongsTo: string;
  iconConfig?: {
    type: 'fill' | 'stroke';
    Icon: React.ComponentType<{ className?: string }>;
  };
  className?: string;
  isActive: (params: DropdownValueParams<Config>) => boolean;
  onClick: (params: DropdownValueParams<Config>) => void;
  getIsDisabled: (params: DropdownValueParams<Config>) => boolean;
  priority: number;
};

export type DropdownValueParams<Config extends Record<string, any>> = {
  editor: Editor;
  config: Config;
};
