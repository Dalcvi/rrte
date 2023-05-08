import { createExtension } from '@rrte/common';
import { historyExtension } from './extension';
import { toolbarButtons } from './toolbar';

export const History = () =>
  createExtension(historyExtension, {
    toolbar: toolbarButtons,
  });
