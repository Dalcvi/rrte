import classNames from 'classnames';
import classes from './toolbar-modal.module.scss';
import { forwardRef } from 'react';

type ToolbarModalProps = {
  children: React.ReactNode;
  className?: string;
  center?: boolean;
};

export const ToolbarModal = forwardRef<HTMLSelectElement, ToolbarModalProps>(
  ({ children, className, center }, ref) => {
    return (
      <section
        ref={ref}
        className={classNames(classes.toolbarModal, className, { [classes.centered]: !!center })}
      >
        {children}
      </section>
    );
  }
);

export const ToolbarModalContainer = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => {
    return (
      <div ref={ref} className={classes.toolbarModalContainer}>
        {children}
      </div>
    );
  }
);
