import { createMark } from '@rrte/common';
import { StrikeMark } from './mark';
import { ToolbarButton } from './toolbar';

export const Strike = () => createMark(StrikeMark, { toolbar: ToolbarButton });
