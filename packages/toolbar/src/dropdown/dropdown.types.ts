import { Editor } from '@tiptap/react';
import { ToolbarItemType } from '../toolbar.types';

export type DropdownConfig = {
  name: string;
  type: typeof ToolbarItemType.DROPDOWN;
  text: string;
  DropdownPriority: number;
  priority: number;
  values: DropdownValue[];
};

export type DropdownValue = {
  name: string;
  text: string;
  className?: string;
  isActive: ({ editor }: { editor: Editor }) => boolean;
  onClick: ({ editor }: { editor: Editor }) => void;
  priority: number;
};
