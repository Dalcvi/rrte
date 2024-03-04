import { createMark } from '@rrte/common';
import { BoldMark } from './mark';
import { ToolbarButton } from './toolbar';

export const Bold = () => createMark(BoldMark, { toolbar: ToolbarButton });
