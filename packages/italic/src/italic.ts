import { createMark } from '@rrte/common';
import { ItalicMark } from './mark';
import { ToolbarButton } from './toolbar';

export const Italic = () => createMark(ItalicMark, { toolbar: ToolbarButton });
