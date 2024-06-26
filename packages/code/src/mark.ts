import { Mark, markInputRule, markPasteRule, mergeAttributes } from '@tiptap/core';
import classes from './code.module.scss';

export interface CodeOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    code: {
      /**
       * Set a code node
       */
      setCode: () => ReturnType;
      /**
       * Toggle a code node
       */
      toggleCode: () => ReturnType;
      /**
       * Unset a code node
       */
      unsetCode: () => ReturnType;
    };
  }
}

export const regex = /(?:^|\s)((?:`)((?:[^`]+))(?:`))$/g;

export const CodeMark = Mark.create<CodeOptions>({
  name: 'code',

  addOptions() {
    return {
      HTMLAttributes: {
        class: classes.base,
      },
    };
  },

  content: 'text',

  group: 'inline',

  allowGapCursor: true,

  exitable: true,

  code: true,

  defining: true,

  parseHTML() {
    return [{ tag: 'code' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['code', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  speechCommands: t => [
    {
      group: t('voice-group.text-formatting'),
      activationKeyword: t('voice-command.toggle-code'),
      command: 'toggleCode',
      description: 'Toggle inline code',
    },
  ],

  addCommands() {
    return {
      setCode:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      toggleCode:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
      unsetCode:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-c': () => this.editor.commands.toggleCode(),
    };
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: regex,
        type: this.type,
      }),
    ];
  },

  addInputRules() {
    return [
      markInputRule({
        find: regex,
        type: this.type,
      }),
    ];
  },
});
