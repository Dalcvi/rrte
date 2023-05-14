import { mergeAttributes, Node, wrappingInputRule } from '@tiptap/core';
import classes from './blockquote.module.scss';

export interface BlockquoteOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    blockQuote: {
      /**
       * Set a blockquote node
       */
      setBlockquote: () => ReturnType;
      /**
       * Toggle a blockquote node
       */
      toggleBlockquote: () => ReturnType;
      /**
       * Unset a blockquote node
       */
      unsetBlockquote: () => ReturnType;
    };
  }
}

export const inputRegex = /^\s*>\s$/;

export const BlockquoteNode = Node.create<BlockquoteOptions>({
  name: 'blockquote',

  addOptions() {
    return {
      HTMLAttributes: {
        class: classes.base,
      },
    };
  },

  content: 'paragraph*',

  group: 'block',

  defining: true,

  parseHTML() {
    return [{ tag: 'blockquote' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'blockquote',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-testid': 'blockquote',
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setBlockquote:
        () =>
        ({ commands }) => {
          return commands.wrapIn(this.name);
        },
      toggleBlockquote:
        () =>
        ({ commands }) => {
          return commands.toggleWrap(this.name);
        },
      unsetBlockquote:
        () =>
        ({ commands }) => {
          return commands.lift(this.name);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-b': () => this.editor.commands.toggleBlockquote(),
    };
  },

  addInputRules() {
    return [
      wrappingInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },
});
