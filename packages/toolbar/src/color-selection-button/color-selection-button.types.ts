import { Editor } from '@tiptap/react';
import { ToolbarGroup, ToolbarItemType } from '../toolbar.types';
import { ChangeEvent } from 'react';

export type ColorSelectionButtonConfig = {
  name: string;
  type: typeof ToolbarItemType.COLOR_SELECTION;
  text: string;
  removeText: string;
  Icon: React.FC<{ value: string | undefined }>;
  onChange: (e: ChangeEvent<HTMLInputElement>, params: ColorSelectionButtonParams) => void;
  onReset: (params: ColorSelectionButtonParams) => void;
  getValue: (params: ColorSelectionButtonParams) => string | undefined;
  getCanReset: (params: ColorSelectionButtonParams, value: string | undefined) => boolean;
  getIsDisabled: (params: ColorSelectionButtonParams) => boolean;
  priority: number;
  group: ToolbarGroup;
};

export type ColorSelectionButtonParams = {
  editor: Editor;
};
