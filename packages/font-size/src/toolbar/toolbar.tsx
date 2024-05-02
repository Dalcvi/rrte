import { AttributeValue, currentSelectionAttributeValue, NumberControlConfig } from '@rrte/common';
import { FontSizeExtension } from '../extension';

const getValue = (value: string | AttributeValue | undefined) => {
  if (!value) {
    return;
  }

  if (typeof value === 'string') {
    return Number(value.replace(/\D/g, ''));
  }

  if (!value.id) {
    return;
  }

  const element = document.getElementById(value.id);
  if (!element) {
    return;
  }

  const fontSize = window.getComputedStyle(element).fontSize;
  return Number(fontSize.replace(/\D/g, ''));
};

export const ToolbarButton: NumberControlConfig = {
  name: FontSizeExtension.name,
  text: 'font-size-selector.text',
  increaseText: 'font-size-selector.increase',
  decreaseText: 'font-size-selector.decrease',
  type: 'number-control' as const,
  getValue: ({ editor }) =>
    getValue(currentSelectionAttributeValue('fontSize', editor, 'font-size')),
  getIsDisabled: ({ editor }) => !editor.can().setFontSize(`${1}px`),
  onChange: ({ editor, value }) => editor.chain().setFontSize(`${value}px`).run(),
  priority: 104,
  group: {
    name: 'typography',
    text: 'typography.text',
    priority: 100,
    toolbar: 'main',
  },
};
