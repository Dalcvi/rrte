import { createNode } from '@rrte/common';
import { BlockquoteNode } from './node';
import { ToolbarButton } from './toolbar';

export const Blockquote = () => createNode(BlockquoteNode, { toolbar: ToolbarButton });
