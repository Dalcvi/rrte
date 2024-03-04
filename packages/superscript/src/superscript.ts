import { createMark } from '@rrte/common';
import { SuperscriptMark } from './mark';
import { ToolbarButton } from './toolbar';

export const Superscript = () => createMark(SuperscriptMark, { toolbar: ToolbarButton });
