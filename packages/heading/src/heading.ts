import { HeadingNode } from './node';
import { createNode } from '@rrte/common';
import { ToolbarDropdown } from './toolbar';

export const Heading = () =>
  createNode(HeadingNode, {
    toolbar: ToolbarDropdown,
  });
