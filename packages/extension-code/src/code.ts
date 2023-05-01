import { createExtension } from '@rrte/common';
import { CodeMark } from './mark';
import { ToolbarButton } from './toolbar';

export const Code = () => createExtension(CodeMark, { toolbar: ToolbarButton });
