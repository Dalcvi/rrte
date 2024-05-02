import {
  AttributeValue,
  ColorSelectionButtonConfig,
  currentSelectionAttributeValue,
} from '@rrte/common';
import { HighlightExtension } from '../extension';
import PaintBucket from './paint-bucket.icon.svg';
import classes from './toolbar.module.scss';

const getBackgroundHighlight = (value: string | AttributeValue) => {
  if (typeof value === 'string') {
    return value;
  }

  if (!value.id) {
    return;
  }

  const element = document.getElementById(value.id);
  if (!element) {
    return;
  }
  return window.getComputedStyle(element).backgroundColor;
};

export const ToolbarButton: ColorSelectionButtonConfig = {
  name: HighlightExtension.name,
  text: 'highlight-button.text',
  removeText: 'highlight-button.remove',
  type: 'color-selection',
  priority: 102,
  onChange: (e, { editor }) => {
    editor.chain().focus().setHighlight(e.target.value).run();
  },
  onReset: ({ editor }) => {
    editor.chain().focus().unsetHighlight().run();
  },
  getValue: ({ editor }) => {
    const value = currentSelectionAttributeValue('backgroundColor', editor, 'background-color');
    return value ? getBackgroundHighlight(value) : undefined;
  },
  getCanReset: (_, value) => {
    const color = value ? getBackgroundHighlight(value) : undefined;

    return !!color && typeof value === 'string' && value.length > 0;
  },
  getIsDisabled: ({ editor }) => !editor.can().setHighlight(null),
  Icon: ({ value }) => (
    // @ts-ignore
    <span className={classes.bucketContainer} style={{ '--rrte-current-highlight-color': value }}>
      <PaintBucket height="15px" width="15px" />
    </span>
  ),
  group: {
    name: 'text-colouring',
    text: 'text-colouring-group.text',
    priority: 5,
    toolbar: 'main',
  },
};
