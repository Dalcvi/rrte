import { createMark } from '@rrte/common';
import { CodeMark } from './mark';
import { ToolbarButton } from './toolbar';

export const Code = () => createMark(CodeMark, { toolbar: ToolbarButton });
