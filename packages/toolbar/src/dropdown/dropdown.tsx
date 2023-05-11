import { useEffect, useMemo, useState } from 'react';
import { DropdownConfig } from './dropdown.types';
import type { Editor } from '@tiptap/react';
import { sortByPriority } from '../toolbar.utils';
import classes from './dropdown.module.scss';
import ChevronDown from './chevron-down.svg';
import classNames from 'classnames';

export const Dropdown = (props: DropdownConfig & { editor: Editor }) => {
  const { editor, ...dropdown } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownButton, setDropdownButton] = useState<HTMLDivElement | null>(null);
  const valuesByPriority = sortByPriority(dropdown.values);
  const close = useMemo(
    () => (e?: MouseEvent) => {
      if (e && dropdownButton && dropdownButton.contains(e.target as Node)) {
        return;
      }
      document.removeEventListener('click', close);
      document.removeEventListener('keydown', escapeClose);
      setIsOpen(false);
    },
    [dropdownButton],
  );
  const escapeClose = useMemo(
    () => (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    },
    [close],
  );
  const selectedValue = valuesByPriority.find((value) => value.isActive({ editor }))?.text;

  useEffect(() => {
    return () => {
      document.removeEventListener('click', close);
      document.removeEventListener('keydown', escapeClose);
    };
  }, [dropdownButton]);

  return (
    <div className={classes.container}>
      <div
        data-testid={dropdown.name}
        ref={setDropdownButton}
        className={classNames(classes.select, {
          [classes.open]: isOpen,
        })}
        onClick={() => {
          setIsOpen(true);
          document.addEventListener('click', close);
          document.addEventListener('keydown', escapeClose);
        }}
      >
        <div className={classes.value}>{selectedValue}</div>
        <ChevronDown
          className={classNames(classes.arrow, {
            [classes.arrowOpen]: isOpen,
          })}
        />
        <input aria-label={dropdown.name} className={classes.input} value={selectedValue} readOnly />
      </div>
      {isOpen && (
        <div className={classNames(classes.dropdownItemsContainer, classes.openDropdown)}>
          {valuesByPriority.map((value, index) => {
            return (
              <button
                aria-label={value.name}
                data-testid={value.name}
                autoFocus={index === 0}
                className={classNames(classes.dropdownItem, value.className)}
                key={value.name}
                onClick={() => {
                  value.onClick({ editor });
                }}
              >
                {value.text}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
