import {
  AttributeValue,
  ColorSelectionButtonConfig,
  currentSelectionAttributeValue,
} from '@rrte/common';
import { ColorExtension } from '../extension';
import classes from './toolbar.module.scss';

const getColor = (value: string | AttributeValue) => {
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
  return window.getComputedStyle(element).color;
};

export const ToolbarButton: ColorSelectionButtonConfig = {
  name: ColorExtension.name,
  text: 'color-button.text',
  removeText: 'color-remove.text',
  type: 'color-selection',
  priority: 103,
  onChange: (e, { editor }) => {
    editor.chain().focus().setColor(e.target.value).run();
  },
  onReset: ({ editor }) => {
    editor.chain().focus().unsetColor().run();
  },
  getValue: ({ editor }) => {
    const value = currentSelectionAttributeValue('color', editor);
    return value ? getColor(value) : undefined;
  },
  getCanReset: ({}, value) => {
    const color = value ? getColor(value) : undefined;

    return !!color && typeof value === 'string' && value.length > 0;
  },
  getIsDisabled: ({ editor }) => !editor.can().setColor(null),
  Icon: ({ value }) => (
    <span className={classes.colorLetter} style={{ color: value }}>
      A
    </span>
  ),
  group: {
    name: 'text-colouring',
    text: 'text-colouring-group.text',
    priority: 5,
    toolbar: 'main',
  },
};
