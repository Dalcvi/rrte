import { Editor } from '@tiptap/react';
import { ToolbarGroup, ToolbarItemType } from '../toolbar.types';
import { ChangeEvent } from 'react';

export type InputIconButtonConfig<T extends Record<string, any> = Record<string, any>> = {
  name: string;
  type: typeof ToolbarItemType.INPUT_ICON;
  text: string;
  Icon: React.FC<{ className: string }>;
  onChange: (e: ChangeEvent<HTMLInputElement>, params: InputIconButtonParams<T>) => void;
  getIsDisabled: (params: InputIconButtonParams<T>) => boolean;
  getAcceptableFiles: (params: InputIconButtonParams<T>) => string;
  priority: number;
  iconStyling: 'fill' | 'stroke';
  group: ToolbarGroup;
};

export type InputIconButtonParams<T extends Record<string, any>> = {
  editor: Editor;
  config: T;
};
