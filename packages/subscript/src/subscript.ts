import { createMark } from '@rrte/common';
import { SubscriptMark } from './mark';
import { ToolbarButton } from './toolbar';

export const Subscript = () => createMark(SubscriptMark, { toolbar: ToolbarButton });
