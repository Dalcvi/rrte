import { createExtension } from '@rrte/common';
import { CodeBlockNode } from './node';
import { ToolbarButton } from './toolbar';

export const CodeBlock = () => createExtension(CodeBlockNode, { toolbar: ToolbarButton });
