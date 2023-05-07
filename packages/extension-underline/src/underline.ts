import { createExtension } from '@rrte/common';
import { UnderlineMark } from './mark';
import { ToolbarButton } from './toolbar';

export const Underline = () => createExtension(UnderlineMark, { toolbar: ToolbarButton });
