import { createExtension } from '@rrte/common';
import { BulletListNode } from './node';
import { ToolbarButton } from './toolbar';

export const BulletList = () => createExtension(BulletListNode, { toolbar: ToolbarButton });
