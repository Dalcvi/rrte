import React, { forwardRef } from 'react';
import classes from './button.module.scss';

type ButtonProps = JSX.IntrinsicAttributes & {
  onClick: () => void;
  disabled?: boolean;
  text: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, text, disabled, ...rest }, ref) => {
    return (
      <button disabled={disabled} className={classes.button} onClick={onClick} ref={ref} {...rest}>
        {text}
      </button>
    );
  }
);
