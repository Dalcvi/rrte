import { createExtension } from '@rrte/common';
import { BoldExtension } from './extension';
import { ToolbarButton } from './toolbar';

export const Bold = () => createExtension(BoldExtension, { toolbar: ToolbarButton });
