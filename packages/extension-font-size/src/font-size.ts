import { createExtension } from '@rrte/common';
import { FontSizeExtension } from './extension';
import { ToolbarButton } from './toolbar';

export const FontSize = () => createExtension(FontSizeExtension, { toolbar: ToolbarButton });
