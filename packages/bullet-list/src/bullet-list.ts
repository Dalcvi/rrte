import { createNode } from '@rrte/common';
import { BulletListNode } from './node';
import { ToolbarButton } from './toolbar';

export const BulletList = () => createNode(BulletListNode, { toolbar: ToolbarButton });
