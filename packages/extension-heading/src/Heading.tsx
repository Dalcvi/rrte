import { HeadingNode } from './node';
import { createExtension } from '@rrte/common';
import { toolbarDropdown } from './toolbar';

export const Heading = () =>
  createExtension(HeadingNode, {
    toolbar: toolbarDropdown,
  });
