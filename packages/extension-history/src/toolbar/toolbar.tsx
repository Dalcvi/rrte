import type { RegularButtonConfig } from '@rrte/common';
import UndoIcon from './undo.icon.svg';
import RedoIcon from './undo.icon.svg';
import { Editor } from '@tiptap/core';
import classes from './toolbar.module.scss';
import classNames from 'classnames';

const UndoButton = ({ editor }: { editor: Editor }) => {
  return (
    <button
      data-testid="undo-button"
      disabled={!editor.can().undo()}
      className={classes.historyButton}
      onClick={() => {
        editor.chain().undo().focus().run();
      }}
    >
      <UndoIcon height={'10px'} width={'10px'} className={classes.icon} />
    </button>
  );
};

const RedoButton = ({ editor }: { editor: Editor }) => {
  return (
    <button
      data-testid="redo-button"
      disabled={!editor.can().redo()}
      className={classes.historyButton}
      onClick={() => {
        editor.chain().redo().focus().run();
      }}
    >
      <RedoIcon height={'10px'} width={'10px'} className={classNames(classes.icon, classes.flip)} />
    </button>
  );
};

export const ToolbarButtons: RegularButtonConfig[] = [
  {
    Button: UndoButton,
    name: 'Undo',
    text: 'Undo',
    type: 'icon' as const,
    priority: -1,
  },
  {
    Button: RedoButton,
    name: 'Redo',
    text: 'Redo',
    type: 'icon' as const,
    priority: 0,
  },
];
