import { mergeAttributes, Node } from '@tiptap/core';
import classes from './paragraph.module.scss';

export interface ParagraphOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    paragraph: {
      /**
       * Toggle a paragraph
       */
      setParagraph: () => ReturnType;
    };
  }
}

export const ParagraphNode = Node.create<ParagraphOptions>({
  name: 'paragraph',

  priority: 1000,

  addOptions() {
    return {
      HTMLAttributes: {
        class: classes.base,
      },
    };
  },

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [{ tag: 'p' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'p',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-testid': 'paragraph',
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setParagraph:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Alt-0': () => this.editor.commands.setParagraph(),
    };
  },
});
