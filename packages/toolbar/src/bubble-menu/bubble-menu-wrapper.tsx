import classNames from 'classnames';
import { forwardRef, useEffect, useState } from 'react';
import classes from './bubble-menu-wrapper.module.scss';

type BubbleMenuWrapper = {
  children: React.ReactNode;
  firstChild: HTMLElement | null;
};

export const BubbleMenuWrapper = forwardRef<HTMLElement, BubbleMenuWrapper>(
  ({ children, firstChild }, ref) => {
    const [maxWidth, setMaxWidth] = useState(0);
    const [bubbleMenuWrapper, setBubbleMenuWrapper] = useState<HTMLElement | null>(null);

    useEffect(() => {
      if (!firstChild || !document || !bubbleMenuWrapper) {
        return;
      }
      const focusOnKeyboardEvent = (event: KeyboardEvent) => {
        const currentActiveElement = document.activeElement;
        if (!!bubbleMenuWrapper?.contains(currentActiveElement)) {
          return;
        }

        if (event.key === 'M' && event.ctrlKey && event.shiftKey) {
          event.preventDefault();
          firstChild.focus();
        }
      };
      document.addEventListener('keydown', focusOnKeyboardEvent);

      return () => {
        document.removeEventListener('keydown', focusOnKeyboardEvent);
      };
    }, [firstChild, bubbleMenuWrapper, document]);

    useEffect(() => {
      const editor = document.querySelector("[data-testid='rrte-editor']") as HTMLElement;
      if (!editor || !window || typeof ResizeObserver === 'undefined') {
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
      <section
        ref={reference => {
          setBubbleMenuWrapper(reference);
          if (!ref) {
            return;
          }
          if ('current' in ref) {
            ref.current = reference;
            return;
          }

          ref(reference);
        }}
        className={classNames(classes.bubbleMenuWrapper)}
        style={{ maxWidth }}
      >
        {children}
      </section>
    );
  }
);
