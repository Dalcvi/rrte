import type { Editor } from '@tiptap/react';
import { NumberControlConfig } from '.';
import { useTranslations } from '@rrte/i18n';
import classNames from 'classnames';
import classes from './number-control.module.scss';
import { forwardRef } from 'react';
import PlusIcon from './plus.icon.svg';
import MinusIcon from './minus.icon.svg';

export const NumberControl = forwardRef<
  HTMLInputElement,
  {
    text: NumberControlConfig['text'];
    decreaseText: NumberControlConfig['decreaseText'];
    increaseText: NumberControlConfig['increaseText'];
    getValue: NumberControlConfig['getValue'];
    onChange: NumberControlConfig['onChange'];
    getIsDisabled: NumberControlConfig['getIsDisabled'];
    editor: Editor;
  }
>((props, ref) => {
  const { editor, text, getValue, decreaseText, increaseText, onChange, getIsDisabled } = props;
  const { t } = useTranslations();

  const currentValue = getValue({ editor });

  const removeLeadingZero = (value: number) => {
    const removedLeadingZero = value.toString().replace(/^0+/, '');
    return parseInt(removedLeadingZero === '' ? '0' : removedLeadingZero, 10);
  };

  const handleNumberChange = (value: string, action: 'NOTHING' | 'INCREASE' | 'DECREASE') => {
    const newValue = value.replace(/\D/g, '');
    const numberValue = parseInt(newValue, 10);

    if (action === 'INCREASE') {
      onChange({ editor, value: removeLeadingZero(numberValue + 1) });
    }

    if (action === 'DECREASE') {
      onChange({ editor, value: removeLeadingZero(numberValue - 1) });
    }

    if (action === 'NOTHING') {
      onChange({ editor, value: removeLeadingZero(numberValue) });
    }
  };

  const isDisabled = getIsDisabled({ ...props });

  return (
    <section aria-label={t(text)} className={classes.container}>
      <button
        data-tooltip-id="toolbar-buttons-tooltip"
        data-tooltip-content={t(decreaseText)}
        aria-label={t(decreaseText)}
        disabled={isDisabled || typeof currentValue === 'undefined' || currentValue <= 0}
        onClick={() => currentValue && handleNumberChange(currentValue.toString(), 'DECREASE')}
        className={classNames(classes.numberControlButton, classes.numberControlFirst)}
      >
        <MinusIcon className={classNames(classes.icon)} height={'30px'} width={'30px'} />
      </button>
      <input
        ref={ref}
        disabled={isDisabled}
        data-tooltip-id="toolbar-buttons-tooltip"
        data-tooltip-content={t(text)}
        aria-label={t(text)}
        className={classes.numberInput}
        value={currentValue}
        type="text"
        onChange={e => handleNumberChange(e.target.value, 'NOTHING')}
      />
      <button
        data-tooltip-id="toolbar-buttons-tooltip"
        data-tooltip-content={t(increaseText)}
        aria-label={t(increaseText)}
        disabled={isDisabled || typeof currentValue === 'undefined'}
        onClick={() => currentValue && handleNumberChange(currentValue.toString(), 'INCREASE')}
        className={classNames(classes.numberControlButton, classes.numberControlSecond)}
      >
        <PlusIcon className={classNames(classes.icon)} height={'15px'} width={'15px'} />
      </button>
    </section>
  );
});
