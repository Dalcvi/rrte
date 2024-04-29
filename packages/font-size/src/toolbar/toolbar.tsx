import {
  AttributeValue,
  currentSelectionAttributeValue,
  type RegularButtonConfig,
} from '@rrte/common';
import { FontSizeExtension } from '../extension';
import classes from './toolbar.module.scss';

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

const Button: RegularButtonConfig['Button'] = ({ editor, t }) => {
  const value = getValue(currentSelectionAttributeValue('fontSize', editor, 'font-size'));

  return (
    <input
      data-testid="font-size-input"
      aria-label={t('font-size-selector.text')}
      className={classes.numberInput}
      type="number"
      value={value}
      min={1}
      onChange={e => {
        if (!e.target.value || Number(e.target.value) < 1) {
          editor.chain().setFontSize(`${1}px`).run();
          return;
        }
        editor.chain().setFontSize(`${e.target.value}px`).run();
      }}
    />
  );
};

export const ToolbarButton: RegularButtonConfig = {
  Button,
  name: FontSizeExtension.name,
  text: 'font-size-selector.text',
  type: 'icon' as const,
  priority: 104,
};
