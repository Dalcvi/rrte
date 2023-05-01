import { AttributeValue, currentSelectionAttributeValue, type RegularButtonConfig } from '@rrte/common';
import { ColorExtension } from '../extension';
import classes from './toolbar.module.scss';
import { Editor } from '@tiptap/core';

const getBackgroundColor = (value: string | AttributeValue) => {
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

const getCurrentValue = currentSelectionAttributeValue('color');

const Button = ({ editor }: { editor: Editor }) => {
  const currentValue = getCurrentValue(editor);
  const color = currentValue ? getBackgroundColor(currentValue) : undefined;

  return (
    <input
      data-hook="color-input"
      disabled={!editor.can().setColor(null)}
      type="color"
      value={color}
      className={classes.colorInput}
      onChange={(e) => {
        editor.chain().focus().setColor(e.target.value).run();
      }}
    />
  );
};

export const ToolbarButton: RegularButtonConfig = {
  Button,
  name: ColorExtension.name,
  text: 'Color',
  type: 'icon' as const,
  priority: 1,
};
