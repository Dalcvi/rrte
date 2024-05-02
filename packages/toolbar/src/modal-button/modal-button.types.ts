import { Editor } from '@tiptap/react';
import { ToolbarGroup, ToolbarItemType } from '../toolbar.types';

export type ModalButtonConfig<T extends Record<string, any> = Record<string, any>> = {
  name: string;
  type: typeof ToolbarItemType.MODAL;
  text: string;
  Icon: React.FC<{ className: string }>;
  ModalContent: React.FC<{
    editor: Editor;
    config: T;
    setFirstItemRef: (ref: HTMLElement | null) => void;
    setLastItemRef: (ref: HTMLElement | null) => void;
    closeModal: () => void;
  }>;
  getIsDisabled: (params: ModalButtonParams<T>) => boolean;
  priority: number;
  iconStyling: 'fill' | 'stroke';
  group: ToolbarGroup;
};

export type ModalButtonParams<T extends Record<string, any>> = {
  editor: Editor;
  config: T;
};
