import { Editor } from '@tiptap/react';
import { ToolbarItemType } from '../toolbar.types';

export type RegularButtonConfig<T extends Record<string, any> = Record<string, any>> = {
  name: string;
  type: typeof ToolbarItemType.ICON;
  text: string;
  Button: (props: RegularButtonWrapperProps<T>) => JSX.Element;
  priority: number;
};

export type RegularButtonWrapperProps<T extends Record<string, any>> = {
  editor: Editor;
  config: T;
};
