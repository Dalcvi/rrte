import { createExtension } from '@rrte/common';
import { OrderedListNode } from './node';
import { ToolbarButton } from './toolbar';

export const OrderedList = () => createExtension(OrderedListNode, { toolbar: ToolbarButton });
