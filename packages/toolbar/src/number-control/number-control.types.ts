import { Editor } from '@tiptap/react';
import { ToolbarGroup, ToolbarItemType } from '../toolbar.types';

export type NumberControlConfig = {
  name: string;
  type: typeof ToolbarItemType.NUMBER_CONTROL;
  text: string;
  decreaseText: string;
  increaseText: string;
  getValue: (params: NumberControlParams) => number | undefined;
  onChange: (params: NumberControlParams & { value: number }) => void;
  getIsDisabled: (params: NumberControlParams) => boolean;
  priority: number;
  group: ToolbarGroup;
};

export type NumberControlParams = {
  editor: Editor;
};
