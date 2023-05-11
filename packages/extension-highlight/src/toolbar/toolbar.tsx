import { AttributeValue, currentSelectionAttributeValue, type RegularButtonConfig } from '@rrte/common';
import { HighlightExtension } from '../extension';
import classes from './toolbar.module.scss';
import { Editor } from '@tiptap/core';
import CloseIcon from './close.icon.svg';
import classNames from 'classnames';

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

const Button = ({ editor }: { editor: Editor }) => {
  const currentValue = currentSelectionAttributeValue('backgroundColor', editor);
  const highlight = currentValue ? getBackgroundHighlight(currentValue) : undefined;

  return (
    <div className={classes.highlightContainer}>
      <input
        data-testid="highlight-input"
        aria-label="highlight"
        disabled={!editor.can().setHighlight(null)}
        type="color"
        value={highlight}
        className={classNames(classes.highlightInput, {
          [classes.withReset]: highlight && highlight.startsWith('#'),
        })}
        onChange={(e) => {
          editor.chain().focus().setHighlight(e.target.value).run();
        }}
      />
      {highlight && highlight.startsWith('#') && (
        <button
          aria-label="reset highlight"
          data-testid="highlight-reset"
          className={classes.highlightReset}
          onClick={() => {
            editor.chain().focus().unsetHighlight().run();
          }}
        >
          <CloseIcon height={'15px'} width={'15px'} />
        </button>
      )}
    </div>
  );
};

export const ToolbarButton: RegularButtonConfig = {
  Button,
  name: HighlightExtension.name,
  text: 'Highlight',
  type: 'icon' as const,
  priority: 1,
};
