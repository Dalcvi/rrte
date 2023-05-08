import { HeadingNode } from './node';
import { createExtension } from '@rrte/common';
import { ToolbarDropdown } from './toolbar';

export const Heading = () =>
  createExtension(HeadingNode, {
    toolbar: ToolbarDropdown,
  });
