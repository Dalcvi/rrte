import { createExtension } from '@rrte/common';
import { HighlightExtension } from './extension';
import { ToolbarButton } from './toolbar';

export const Highlight = () => createExtension(HighlightExtension, { toolbar: ToolbarButton });
