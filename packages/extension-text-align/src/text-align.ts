import { TextAlignExtension } from './extension';
import { createExtension } from '@rrte/common';
import {
  CenterAlignToolbarButton,
  JustifyAlignToolbarButton,
  LeftAlignToolbarButton,
  RightAlignToolbarButton,
} from './toolbar';

export const TextAlign = ({ attachToNodes }: { attachToNodes?: string[] } = {}) => {
  const defaultTypes = ['paragraph', 'heading'];
  const types = attachToNodes ?? defaultTypes;
  return createExtension(
    TextAlignExtension.configure({
      types: types,
    }),
    {
      toolbar: [LeftAlignToolbarButton, RightAlignToolbarButton, CenterAlignToolbarButton, JustifyAlignToolbarButton],
      types,
    },
  );
};
