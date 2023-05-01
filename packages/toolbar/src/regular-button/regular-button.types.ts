import { Editor } from '@tiptap/react';
import { ToolbarItemType } from '../toolbar.types';

export type RegularButtonConfig = {
  name: string;
  type: typeof ToolbarItemType.ICON;
  text: string;
  Button: (props: RegularButtonWrapperProps) => JSX.Element;
  priority: number;
};

export type RegularButtonWrapperProps = {
  editor: Editor;
};
