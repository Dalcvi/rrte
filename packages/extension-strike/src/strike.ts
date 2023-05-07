import { createExtension } from '@rrte/common';
import { StrikeMark } from './mark';
import { ToolbarButton } from './toolbar';

export const Strike = () => createExtension(StrikeMark, { toolbar: ToolbarButton });
