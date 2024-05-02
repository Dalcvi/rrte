import type { Editor } from '@tiptap/react';
import { CustomLogicButtonConfig } from '.';

export const CustomLogicButton = (
  props: CustomLogicButtonConfig & {
    editor: Editor;
    editorContainerRef: HTMLElement | null;
  }
) => {
  const { Component } = props;
  return <Component {...props} />;
};
