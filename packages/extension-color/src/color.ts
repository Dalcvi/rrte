import { createExtension } from '@rrte/common';
import { ColorExtension } from './extension';
import { ToolbarButton } from './toolbar';

export const Color = () => createExtension(ColorExtension, { toolbar: ToolbarButton });
