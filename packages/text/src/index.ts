import { createNode } from '@rrte/common';
import { TextNode } from './text';

export * from './text';

export const Text = () => {
  return createNode(TextNode, {
    translations: {
      en: {
        'voice-command.select-sentence': 'select sentence',
        'voice-command.select-previous-sentence-also': 'select previous sentence also',
        'voice-command.select-next-sentence-also': 'select next sentence also',
        'voice-command.select-previous-sentence': 'select previous sentence',
        'voice-command.select-next-sentence': 'select next sentence',
        'voice-command.deselect-sentence': 'deselect sentence',
      },
      lt: {
        'voice-command.select-sentence': 'pažymėti sakinį',
        'voice-command.select-previous-sentence-also': 'pažymėti ankstesnį sakinį kartu',
        'voice-command.select-next-sentence-also': 'pažymėti kitą sakinį kartu',
        'voice-command.select-previous-sentence': 'pažymėti ankstesnį sakinį',
        'voice-command.select-next-sentence': 'pažymėti kitą sakinį',
        'voice-command.deselect-sentence': 'nuimti sakinio pažymėjimą',
      },
    },
  });
};
