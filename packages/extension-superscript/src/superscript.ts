import { createExtension } from '@rrte/common';
import { SuperscriptMark } from './mark';
import { ToolbarButton } from './toolbar';

export const Superscript = () => createExtension(SuperscriptMark, { toolbar: ToolbarButton });
