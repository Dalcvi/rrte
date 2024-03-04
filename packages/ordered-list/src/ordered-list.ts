import { createNode } from '@rrte/common';
import { OrderedListNode } from './node';
import { ToolbarButton } from './toolbar';

export const OrderedList = () => createNode(OrderedListNode, { toolbar: ToolbarButton });
