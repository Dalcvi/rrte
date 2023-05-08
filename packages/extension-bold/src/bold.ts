import { createExtension } from '@rrte/common';
import { BoldMark } from './mark';
import { ToolbarButton } from './toolbar';

export const Bold = () => createExtension(BoldMark, { toolbar: ToolbarButton });
