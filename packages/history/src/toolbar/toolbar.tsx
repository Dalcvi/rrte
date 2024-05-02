import type { RegularButtonConfig } from '@rrte/common';
import classNames from 'classnames';
import classes from './toolbar.module.scss';
import { default as RedoIcon, default as UndoIcon } from './undo.icon.svg';

export const ToolbarButtons: RegularButtonConfig[] = [
  {
    name: 'Undo',
    text: 'undo-button.text',
    type: 'icon' as const,
    priority: -1,
    Icon: ({ className }) => <UndoIcon height={'15px'} width={'15px'} className={className} />,
    getIsActive: () => false,
    getIsDisabled: ({ editor }) => !editor.can().undo(),
    onClick: ({ editor }) => editor.chain().undo().focus().run(),
    iconStyling: 'fill',
    group: {
      name: 'history',
      text: 'history-group.text',
      priority: 1,
      toolbar: 'main',
    },
  },
  {
    name: 'Redo',
    text: 'redo-button.text',
    type: 'icon' as const,
    priority: 0,
    Icon: ({ className }) => (
      <RedoIcon height={'15px'} width={'15px'} className={classNames(className, classes.flip)} />
    ),
    getIsActive: () => false,
    getIsDisabled: ({ editor }) => !editor.can().redo(),
    onClick: ({ editor }) => editor.chain().redo().focus().run(),
    iconStyling: 'fill',
    group: {
      name: 'history',
      text: 'history-group.text',
      priority: 1,
      toolbar: 'main',
    },
  },
];
