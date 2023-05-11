import { createExtension } from '@rrte/common';
import { ColorExtension } from './node';
import { ToolbarButton } from './toolbar';

export const Color = () => createExtension(ColorExtension, { toolbar: ToolbarButton });
