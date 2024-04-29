import type { RegularButtonConfig } from '@rrte/common';
import classNames from 'classnames';
import classes from './toolbar.module.scss';
import { default as RedoIcon, default as UndoIcon } from './undo.icon.svg';

const UndoButton: RegularButtonConfig['Button'] = ({ editor, t }) => {
  return (
    <button
      aria-label={t('undo-button.text')}
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

const RedoButton: RegularButtonConfig['Button'] = ({ editor, t }) => {
  return (
    <button
      aria-label={t('redo-button.text')}
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
    text: 'undo-button.text',
    type: 'icon' as const,
    priority: -1,
  },
  {
    Button: RedoButton,
    name: 'Redo',
    text: 'redo-button.text',
    type: 'icon' as const,
    priority: 0,
  },
];
