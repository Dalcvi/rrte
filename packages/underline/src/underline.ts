import { createMark } from '@rrte/common';
import { UnderlineMark } from './mark';
import { ToolbarButton } from './toolbar';

export const Underline = () => createMark(UnderlineMark, { toolbar: ToolbarButton });
