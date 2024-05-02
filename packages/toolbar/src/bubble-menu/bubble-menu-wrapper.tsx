import classNames from 'classnames';
import classes from './bubble-menu-wrapper.module.scss';
import { forwardRef, useEffect, useState } from 'react';

type BubbleMenuWrapper = {
  children: React.ReactNode;
};

export const BubbleMenuWrapper = forwardRef<HTMLSelectElement, BubbleMenuWrapper>(
  ({ children }, ref) => {
    const [maxWidth, setMaxWidth] = useState(0);

    useEffect(() => {
      const editor = document.querySelector("[data-testid='rrte-editor']") as HTMLElement;
      if (!editor || !window) {
        return;
      }
      const observer = new ResizeObserver(entries => {
        const maxWidth = entries[0].contentRect.width;
        setMaxWidth(maxWidth);
      });
      observer.observe(editor);

      return () => {
        observer.disconnect();
      };
    }, []);
    return (
      <section ref={ref} className={classNames(classes.bubbleMenuWrapper)} style={{ maxWidth }}>
        {children}
      </section>
    );
  }
);
