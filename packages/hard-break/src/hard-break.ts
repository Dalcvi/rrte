import { HardBreakNode } from './node';
import { createNode } from '@rrte/common';

export const HardBreak = () =>
  createNode(HardBreakNode, {
    translations: {
      en: {
        'voice-command.new-line': 'new line',
      },
      lt: {
        'voice-command.new-line': 'nauja eilutė',
      },
    },
  });
