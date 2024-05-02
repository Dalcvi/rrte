import { Editor } from '@tiptap/react';
import { ToolbarGroup, ToolbarItemType } from '../toolbar.types';

export type CustomLogicButtonConfig = {
  name: string;
  type: typeof ToolbarItemType.CUSTOM_LOGIC;
  text: string;
  group: ToolbarGroup;
  priority: number;
  Component: (props: CustomLogicButtonProps) => JSX.Element;
};

export type CustomLogicButtonProps = {
  editor: Editor;
  editorContainerRef: HTMLElement | null;
};
