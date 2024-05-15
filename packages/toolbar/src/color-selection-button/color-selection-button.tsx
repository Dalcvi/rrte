import { useTranslations } from '@rrte/i18n';
import type { Editor } from '@tiptap/react';
import classNames from 'classnames';
import { ColorSelectionButtonConfig } from '.';
import CloseIcon from './close.icon.svg';
import classes from './color-selection-button.module.scss';

export const ColorSelectionButton = ({
  editor,
  Icon,
  text,
  removeText,
  onChange,
  getValue,
  getCanReset,
  onReset,
  getIsDisabled,
}: ColorSelectionButtonConfig & {
  editor: Editor;
}) => {
  const { t } = useTranslations();
  const value = getValue({ editor });

  const isResetEnabled = getCanReset({ editor }, value);
  const barStyle = { background: value };

  const isDisabled = getIsDisabled({ editor });

  return (
    <div
      className={classNames(classes.colorContainer, {
        [classes.disabled]: isDisabled,
      })}
      data-tooltip-id="toolbar-buttons-tooltip"
      data-tooltip-content={t(text)}
    >
      <div
        className={classNames(classes.colorMainButton)}
        data-tooltip-id="toolbar-buttons-tooltip"
        data-tooltip-content={t(text)}
      >
        <input
          aria-label={t(text)}
          disabled={isDisabled}
          type="color"
          value={value}
          data-testid={`${text}-color-selection-input`}
          className={classes.colorInput}
          onChange={e => onChange(e, { editor })}
        />
        <div className={classes.icon}>
          <Icon value={value} />
        </div>
        <div className={classes.colorBar} style={barStyle} />
      </div>
      <button
        data-tooltip-id="toolbar-buttons-tooltip"
        data-tooltip-content={t(removeText)}
        aria-label={t(removeText)}
        className={classes.colorReset}
        disabled={!isResetEnabled || isDisabled}
        onClick={() => onReset({ editor })}
      >
        <CloseIcon height={'15px'} width={'15px'} />
      </button>
    </div>
  );
};
