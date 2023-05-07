import { createExtension } from '@rrte/common';
import { SubscriptMark } from './mark';
import { ToolbarButton } from './toolbar';

export const Subscript = () => createExtension(SubscriptMark, { toolbar: ToolbarButton });
