import React, { forwardRef } from 'react';
import classes from './text-input.module.scss';

type TextInputProps = {
  value: string;
  onChange: (newValue: string) => void;
  label: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ value, onChange, label, onKeyDown }, ref) => {
    return (
      <label className={classes.label}>
        {label}
        <input
          onKeyDown={onKeyDown}
          className={classes.textInput}
          value={value}
          onChange={e => onChange(e.target.value)}
          ref={ref}
        />
      </label>
    );
  }
);
