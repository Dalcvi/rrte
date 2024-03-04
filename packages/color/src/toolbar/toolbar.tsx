import {
  AttributeValue,
  currentSelectionAttributeValue,
  type RegularButtonConfig,
} from '@rrte/common';
import { ColorExtension } from '../extension';
import classes from './toolbar.module.scss';
import classNames from 'classnames';
import { Editor } from '@tiptap/core';
import CloseIcon from './close.icon.svg';
import { useCallback } from 'react';

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

  const isResetEnabled = color && color.startsWith('#');
  const iconDimensions = { width: '15px', height: '15px' };

  const handleColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      editor.chain().focus().setColor(e.target.value).run();
    },
    [editor]
  );

  const handleReset = useCallback(() => {
    editor.chain().focus().unsetColor().run();
  }, [editor]);

  const letterStyle = { color: color };
  const barStyle = { background: color };

  return (
    <div className={classes.colorContainer}>
      <div
        className={classNames(classes.colorMainButton, {
          [classes.withReset]: isResetEnabled,
        })}
      >
        <input
          data-testid="color-input"
          aria-label="Text color"
          disabled={!editor.can().setColor(null)}
          type="color"
          value={color}
          className={classes.colorInput}
          onChange={handleColorChange}
        />
        <div data-testid="color-letter" className={classes.colorLetter} style={letterStyle}>
          A
        </div>
        <div data-testid="color-bar" className={classes.colorBar} style={barStyle} />
      </div>
      {isResetEnabled && (
        <button
          data-testid="color-reset"
          aria-label="reset text color"
          className={classes.colorReset}
          onClick={handleReset}
        >
          <CloseIcon {...iconDimensions} />
        </button>
      )}
    </div>
  );
};

export const ToolbarButton: RegularButtonConfig = {
  Button,
  name: ColorExtension.name,
  text: 'Color',
  type: 'icon',
  priority: 103,
};
