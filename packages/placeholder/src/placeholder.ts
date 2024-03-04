import { createExtension } from '@rrte/common';
import { PlaceholderExtension, PlaceholderOptions } from './extension';

export const Placeholder = (initialOptions: PlaceholderOptions) =>
  createExtension(PlaceholderExtension.configure(initialOptions), {});
