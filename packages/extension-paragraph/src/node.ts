import { Editor, mergeAttributes, Node } from '@tiptap/core';
import classes from './paragraph.module.scss';
import { generateStringAttribute } from '@rrte/common';

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

  addAttributes() {
    return {
      color: generateStringAttribute('color', 'p', 'color', (value) => `rgb(${value})`),
      fontFamily: generateStringAttribute('fontFamily', 'p', 'font-family'),
      fontSize: generateStringAttribute('fontSize', 'p', 'font-size'),
      lineHeight: generateStringAttribute('lineHeight', 'p', 'line-height'),
      fontWeight: generateStringAttribute('fontWeight', 'p', 'font-weight'),
      textDecoration: generateStringAttribute('textDecoration', 'p', 'text-decoration'),
      fontStyle: generateStringAttribute('fontStyle', 'p', 'font-style'),
    };
  },

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
    return ['p', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
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
