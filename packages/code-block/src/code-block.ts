import { createNode } from '@rrte/common';
import { CodeBlockNode } from './node';
import { ToolbarButton } from './toolbar';

export const CodeBlock = () => createNode(CodeBlockNode, { toolbar: ToolbarButton });
