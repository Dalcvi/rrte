import React, { forwardRef } from 'react';
import classes from './number-input.module.scss';

type NumberInputProps = {
  value: string | number;
  onChange: (newValue: string) => void;
  label: string;
  isDisabled?: boolean;
  min?: number;
};

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ value, onChange, label, min, isDisabled }, ref) => {
    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/\D/g, '').replace(/^0+/, '');

      onChange(newValue);
    };

    return (
      <label className={classes.label}>
        {label}
        <input
          min={min}
          disabled={isDisabled}
          className={classes.numberInput}
          value={value}
          type="number"
          onChange={e => handleNumberChange(e)}
          ref={ref}
        />
      </label>
    );
  }
);
