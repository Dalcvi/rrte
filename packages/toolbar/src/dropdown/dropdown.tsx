import { useTranslations } from '@rrte/i18n';
import type { Editor } from '@tiptap/react';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { sortByPriority } from '../toolbar.utils';
import ChevronDown from './chevron-down.svg';
import classes from './dropdown.module.scss';
import { DropdownConfig } from './dropdown.types';

export const Dropdown = ({ editor, ...dropdown }: DropdownConfig & { editor: Editor }) => {
  const { t } = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownButton, setDropdownButton] = useState<HTMLButtonElement | null>(null);

  const valuesByPriority = sortByPriority(dropdown.values);
  const closeModal = useCallback(
    (e?: MouseEvent) => {
      if (e && dropdownButton && dropdownButton.contains(e.target as Node)) {
        return;
      }
      document.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', escapeClose);
      setIsOpen(false);
    },
    [dropdownButton]
  );
  const escapeClose = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    return () => {
      document.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', escapeClose);
    };
  }, [dropdownButton]);

  const selectedValue = valuesByPriority.find(value => value.isActive({ editor }))?.text;

  useEffect(() => {
    return () => {
      document.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', escapeClose);
    };
  }, [dropdownButton]);

  return (
    <div className={classes.container}>
      <button
        data-testid={dropdown.name}
        ref={setDropdownButton}
        role="combobox"
        aria-controls={dropdown.name}
        aria-expanded={isOpen}
        className={classNames(classes.select, {
          [classes.open]: isOpen,
        })}
        onClick={() => {
          setIsOpen(true);
          document.addEventListener('click', closeModal);
          document.addEventListener('keydown', escapeClose);
        }}
      >
        {!!selectedValue && <div className={classes.value}>{t(selectedValue)}</div>}
        <ChevronDown
          className={classNames(classes.arrow, {
            [classes.arrowOpen]: isOpen,
          })}
        />
      </button>
      {isOpen && (
        <ul
          id={dropdown.name}
          role="listbox"
          aria-label={t(dropdown.name)}
          className={classNames(classes.dropdownItemsContainer)}
          onBlur={e => {
            if (e.currentTarget.contains(e.relatedTarget)) {
              return;
            }
            closeModal();
          }}
        >
          {valuesByPriority.map(value => {
            return (
              <li>
                <button
                  role="option"
                  aria-selected={selectedValue === value.text}
                  data-testid={value.name}
                  className={classNames(classes.dropdownItem, value.className)}
                  key={value.name}
                  onClick={() => {
                    closeModal();
                    value.onClick({ editor });
                  }}
                >
                  {t(value.text)}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
