import { Extension } from '@tiptap/core';
import { history, redo, undo } from '@tiptap/pm/history';

export interface HistoryOptions {
  depth: number;
  newGroupDelay: number;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    history: {
      /**
       * Undo recent changes
       */
      undo: () => ReturnType;
      /**
       * Reapply reverted changes
       */
      redo: () => ReturnType;
      /**
       * Clear history
       */
      clearHistory: () => ReturnType;
    };
  }
}

export const historyExtension = Extension.create<HistoryOptions>({
  name: 'history',

  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500,
    };
  },

  speechCommands: t => [
    {
      group: t('voice-group.history'),
      activationKeyword: t('voice-command.undo'),
      command: 'undo',
      description: 'Undo recent changes',
    },
    {
      group: t('voice-group.history'),
      activationKeyword: t('voice-command.redo'),
      command: 'redo',
      description: 'Reapply reverted changes',
    },
  ],

  addCommands() {
    return {
      undo:
        () =>
        ({ state, dispatch }) => {
          return undo(state, dispatch);
        },
      redo:
        () =>
        ({ state, dispatch }) => {
          return redo(state, dispatch);
        },
    };
  },

  addProseMirrorPlugins() {
    return [history(this.options)];
  },

  addKeyboardShortcuts() {
    return {
      'Mod-z': () => this.editor.commands.undo(),
      'Mod-y': () => this.editor.commands.redo(),
      'Shift-Mod-z': () => this.editor.commands.redo(),
    };
  },
});
