import {
  AttributeValue,
  currentSelectionAttributeValue,
  type RegularButtonConfig,
} from '@rrte/common';
import classNames from 'classnames';
import { HighlightExtension } from '../extension';
import CloseIcon from './close.icon.svg';
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

const Button: RegularButtonConfig['Button'] = ({ editor, t }) => {
  const currentValue = currentSelectionAttributeValue(
    'backgroundColor',
    editor,
    'background-color'
  );
  const highlight = currentValue ? getBackgroundHighlight(currentValue) : undefined;

  const isResetEnabled = highlight && typeof currentValue === 'string' && currentValue.length > 0;

  return (
    <div className={classes.highlightContainer}>
      <input
        data-testid="highlight-input"
        aria-label={t('highlight-button.text')}
        disabled={!editor.can().setHighlight(null)}
        type="color"
        value={highlight}
        className={classNames(classes.highlightInput, {
          [classes.withReset]: isResetEnabled,
        })}
        onChange={e => {
          editor.chain().focus().setHighlight(e.target.value).run();
        }}
      />
      {isResetEnabled && (
        <button
          aria-label={t('highlight-button.remove')}
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
  text: 'highlight-button.text',
  type: 'icon' as const,
  priority: 102,
};
