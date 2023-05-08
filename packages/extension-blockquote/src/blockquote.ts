import { createExtension } from '@rrte/common';
import { BlockquoteNode } from './node';
import { ToolbarButton } from './toolbar';

export const Blockquote = () => createExtension(BlockquoteNode, { toolbar: ToolbarButton });
