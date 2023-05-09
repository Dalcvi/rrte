import { createExtension } from '@rrte/common';
import { historyExtension } from './extension';
import { ToolbarButtons } from './toolbar';

export const History = () =>
  createExtension(historyExtension, {
    toolbar: ToolbarButtons,
  });
