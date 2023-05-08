import { AttributeValue, currentSelectionAttributeValue, type RegularButtonConfig } from '@rrte/common';
import { ColorExtension } from '../extension';
import classes from './toolbar.module.scss';
import classNames from 'classnames';
import { Editor } from '@tiptap/core';
import CloseIcon from './close.icon.svg';

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

const Button = ({ editor }: { editor: Editor }) => {
  const currentValue = currentSelectionAttributeValue('color', editor);
  const color = currentValue ? getColor(currentValue) : undefined;

  return (
    <div className={classes.colorContainer}>
      <div
        className={classNames(classes.colorMainButton, {
          [classes.withReset]: color && color.startsWith('#'),
        })}
      >
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
        <div
          className={classes.colorLetter}
          style={{
            color: color,
          }}
        >
          A
        </div>
        <div
          className={classes.colorBar}
          style={{
            background: color,
          }}
        />
      </div>
      {color && color.startsWith('#') && (
        <button
          className={classes.colorReset}
          onClick={() => {
            editor.chain().focus().unsetColor().run();
          }}
        >
          <CloseIcon width={'15px'} height={'15px'} />
        </button>
      )}
    </div>
  );
};

export const ToolbarButton: RegularButtonConfig = {
  Button,
  name: ColorExtension.name,
  text: 'Color',
  type: 'icon' as const,
  priority: 1,
};
