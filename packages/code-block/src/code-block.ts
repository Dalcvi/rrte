import { createNode } from '@rrte/common';
import { CodeBlockNode } from './node';
import { ToolbarButton } from './toolbar';

export const CodeBlock = () =>
  createNode(CodeBlockNode, {
    toolbar: ToolbarButton,
    translations: {
      en: {
        'codeblock-button.text': 'Toggle code block',
        'voice-command.toggle-codeblock': 'toggle code block',
      },
      lt: {
        'codeblock-button.text': 'Perjungti kodo bloką',
        'voice-command.toggle-codeblock': 'pakeisti kodo bloką',
      },
    },
  });
