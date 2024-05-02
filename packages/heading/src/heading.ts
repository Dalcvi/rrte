import { HeadingNode } from './node';
import { createNode } from '@rrte/common';
import { ToolbarDropdown } from './toolbar';

export const Heading = () =>
  createNode(HeadingNode, {
    toolbar: ToolbarDropdown,
    translations: {
      en: {
        'text-styles-dropdown.text': 'Text styles',
        'heading-1-option': 'Heading 1',
        'heading-2-option': 'Heading 2',
        'heading-3-option': 'Heading 3',
        'heading-4-option': 'Heading 4',
        'heading-5-option': 'Heading 5',
        'heading-6-option': 'Heading 6',
        'voice-command.set-heading-one': 'set heading one',
        'voice-command.set-heading-two': 'set heading two',
        'voice-command.set-heading-three': 'set heading three',
        'voice-command.set-heading-four': 'set heading four',
        'voice-command.set-heading-five': 'set heading five',
        'voice-command.set-heading-six': 'set heading six',
        'typography.text': 'Typography',
      },
      lt: {
        'text-styles-dropdown.text': 'Teksto stiliai',
        'heading-1-option': 'Antraštė 1',
        'heading-2-option': 'Antraštė 2',
        'heading-3-option': 'Antraštė 3',
        'heading-4-option': 'Antraštė 4',
        'heading-5-option': 'Antraštė 5',
        'heading-6-option': 'Antraštė 6',
        'voice-command.set-heading-one': 'nustatyti pirmo lygio antraštę',
        'voice-command.set-heading-two': 'nustatyti antro lygio antraštę',
        'voice-command.set-heading-three': 'nustatyti trečio lygio antraštę',
        'voice-command.set-heading-four': 'nustatyti ketvirto lygio antraštę',
        'voice-command.set-heading-five': 'nustatyti penkto lygio antraštę',
        'voice-command.set-heading-six': 'nustatyti šešto lygio antraštę',
        'typography.text': 'Tipografija',
      },
    },
  });
