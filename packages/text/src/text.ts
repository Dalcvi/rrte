import { Node } from '@tiptap/core';
import type {} from '@rrte/common';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    text: {
      /**
       * Insert text content
       */
      insertText: (text: string) => ReturnType;
      /**
       * Replace text content
       */
      replaceText: (text: string, range: { from: number; to: number }) => ReturnType;
      /**
       * Select sentence
       */
      selectSentence: () => ReturnType;
      /**
       * Finds the start of the current sentence and extends the selection to the start of the previous sentence
       */
      selectPreviousSentence: () => ReturnType;
      /**
       * Finds the end of the current sentence and extends the selection to the end of the next sentence
       */
      selectNextSentence: () => ReturnType;
      /**
       * Extend current selection until the start of the previous sentence
       */
      selectPreviousSentenceAlso: () => ReturnType;
      /**
       * Selects right sentence with the current one
       */
      selectNextSentenceAlso: () => ReturnType;
    };
  }
}

export const TextNode = Node.create({
  name: 'text',
  group: 'inline',

  speechCommands: t => [
    {
      group: t('voice-group.text-navigation'),
      activationKeyword: t('voice-command.select-sentence'),
      command: 'selectSentence',
      description: 'Select the current sentence',
    },
    {
      group: t('voice-group.text-navigation'),
      activationKeyword: t('voice-command.select-previous-sentence-also'),
      command: 'selectPreviousSentenceAlso',
      description: 'Select the previous sentence and combine with current selection',
    },
    {
      group: t('voice-group.text-navigation'),
      activationKeyword: t('voice-command.select-next-sentence-also'),
      command: 'selectNextSentenceAlso',
      description: 'Select the next sentence and combine with current selection',
    },
    {
      group: t('voice-group.text-navigation'),
      activationKeyword: t('voice-command.select-previous-sentence'),
      command: 'selectPreviousSentence',
      description: 'Select the previous sentence',
    },
    {
      group: t('voice-group.text-navigation'),
      activationKeyword: t('voice-command.select-next-sentence'),
      command: 'selectNextSentence',
      description: 'Select the next sentence',
    },
  ],

  addCommands() {
    return {
      insertText:
        text =>
        ({ view }) => {
          const { tr } = view.state;
          const { selection } = tr;
          const letterBefore = tr.doc.textBetween(selection.$from.pos - 1, selection.$from.pos);
          const shouldAddSpace = letterBefore && !letterBefore.match(/\s/);

          const newText = shouldAddSpace ? ` ${text}` : text;

          tr.insertText(newText, selection.$from.pos, selection.$to.pos);

          view.dispatch(tr);
          return true;
        },
      replaceText:
        (
          text,
          range: {
            from: number;
            to: number;
          }
        ) =>
        ({ view }) => {
          const { tr } = view.state;

          const letterBefore = tr.doc.textBetween(range.from - 1, range.from);
          const shouldAddSpace = letterBefore && !letterBefore.match(/\s/);

          const to = range.to + (shouldAddSpace ? 1 : 0);
          const isTextEmpty = text.trim() === '';
          const newText = shouldAddSpace && !isTextEmpty ? ` ${text}` : text;

          tr.insertText(newText, range.from, to);

          view.dispatch(tr);

          return true;
        },
      selectSentence:
        () =>
        ({ tr, commands }) => {
          const { selection } = tr;
          const { from, to } = selection;

          if (!from || !to) {
            return false;
          }

          const minimumFrom = Math.max(selection.$from.pos - selection.$from.parentOffset - 1, 1);
          // Find the start of the sentence. Either the start of the text in the parent node OR the first letter of the sentence
          let start = from;
          while (start > minimumFrom && !tr.doc.textBetween(start - 1, start).match(/[.!?]/)) {
            start -= 1;
          }

          const maximumTo = Math.min(
            to - selection.$from.parentOffset + selection.$to.parent.content.size - 1,
            tr.doc.nodeSize - 2
          );
          // Find the end of the sentence. Either the end of the text in the parent node OR the last letter of the sentence
          let end = to;
          while (end < maximumTo && !tr.doc.textBetween(end, end + 1).match(/[.!?]/)) {
            end += 1;
          }

          if (start === end) {
            return false;
          }

          commands.setTextSelection({
            from: start,
            to: end,
          });

          return true;
        },
      selectPreviousSentence:
        () =>
        ({ tr, commands }) => {
          const { selection } = tr;
          const { from, to } = selection;

          if (!from || !to) {
            return false;
          }

          const minimumFrom = Math.max(selection.$from.pos - selection.$from.parentOffset - 1, 1);

          // Find the start of the sentence. Either the start of the text in the parent node OR the first letter of the sentence
          let start = from;
          while (
            start > minimumFrom &&
            (!tr.doc.textBetween(start - 1, start).match(/[.!?]/) ||
              (tr.doc.textBetween(start - 1, start).match(/[.!?]/) && start - 1 === from - 1))
          ) {
            start -= 1;
          }

          commands.setTextSelection({
            from: start,
            to: to,
          });

          return true;
        },
      selectPreviousSentenceAlso:
        () =>
        ({ tr, commands, state }) => {
          const { selection } = tr;
          const { from, to } = selection;

          if (!from || !to) {
            return false;
          }

          const selectionMinimumFrom = Math.max(
            selection.$from.pos - selection.$from.textOffset - 1,
            1
          );
          const resolvedPos = state.doc.resolve(selectionMinimumFrom);
          const checkNodeAt = selectionMinimumFrom - resolvedPos.depth - 1;
          const otherResolvedPos = checkNodeAt > 0 ? state.doc.resolve(checkNodeAt) : null;
          const resolvedNode = !!otherResolvedPos
            ? otherResolvedPos.node(otherResolvedPos.depth)
            : null;
          const isOtherResolvedNodeText =
            (!!resolvedNode && resolvedNode?.isTextblock) || resolvedNode?.isText;

          const minimumFrom = isOtherResolvedNodeText
            ? Math.min(0, selectionMinimumFrom - resolvedNode.nodeSize + 1)
            : selectionMinimumFrom;

          // Find the start of the sentence. Either the start of the text in the parent node OR the first letter of the sentence
          let start = from;
          while (
            start > minimumFrom &&
            (!tr.doc.textBetween(start - 1, start).match(/[.!?]/) ||
              (tr.doc.textBetween(start - 1, start).match(/[.!?]/) &&
                (start === from || (isOtherResolvedNodeText && start === from - 1))))
          ) {
            start -= 1;
          }
          const end = to;

          if (start === end) {
            return false;
          }

          commands.setTextSelection({
            from: start,
            to: end,
          });

          return true;
        },
      selectNextSentenceAlso() {
        return ({ tr, commands }) => {
          const { selection } = tr;
          const { from, to } = selection;

          if (!from || !to) {
            return false;
          }

          const maximumTo = Math.min(
            to - selection.$from.parentOffset + selection.$to.parent.content.size - 1,
            tr.doc.nodeSize - 2
          );
          // Find the end of the sentence. Either the end of the text in the parent node OR the last letter of the sentence
          let end = to;
          while (
            end < maximumTo &&
            (!tr.doc.textBetween(end, end + 1).match(/[.!?]/) || end === to + 1)
          ) {
            end += 1;
          }
          const start = from;

          if (start === end) {
            return false;
          }

          commands.setTextSelection({
            from: start,
            to: end,
          });

          return true;
        };
      },
    };
  },
});
