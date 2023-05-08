import { createExtension } from '@rrte/common';
import { ItalicMark } from './mark';
import { ToolbarButton } from './toolbar';

export const Italic = () => createExtension(ItalicMark, { toolbar: ToolbarButton });
