import { useTranslations } from '@rrte/i18n';
import type { Editor } from '@tiptap/react';
import classNames from 'classnames';
import { sortByPriority } from '../toolbar.utils';
import ChevronDown from './chevron-down.svg';
import classes from './dropdown.module.scss';
import { DropdownConfig } from './dropdown.types';
import { ToolbarModal, ToolbarModalContainer } from '../toolbar-modal';
import { useModal } from '../modal-button/use-modal.hook';

export const Dropdown = ({
  editor,
  configs,
  ...dropdown
}: DropdownConfig<object> & { editor: Editor; configs: Record<string, Record<string, any>> }) => {
  const { t } = useTranslations();
  const {
    isOpen,
    closeModal,
    openDropdown,
    setDropdownButton,
    setDropdownList,
    setFirstItem,
    closeModalWithFocus,
    setLastItem,
  } = useModal();

  const valuesByPriority = sortByPriority(dropdown.values);
  const selectedValue = valuesByPriority.find(value =>
    value.isActive({ editor, config: configs[value.belongsTo] })
  );
  const otherValues = valuesByPriority.filter(value => value.name !== selectedValue?.name);

  const Icon = selectedValue?.iconConfig?.Icon;
  const text = selectedValue?.text;

  const showIcon = !!Icon;
  const showText = !!text && !showIcon;

  return (
    <ToolbarModalContainer>
      <button
        data-testid={dropdown.name}
        ref={setDropdownButton}
        role="combobox"
        tabIndex={isOpen ? -1 : 0}
        aria-label={t(dropdown.text)}
        aria-activedescendant={selectedValue?.name}
        aria-controls={dropdown.name}
        aria-expanded={isOpen}
        disabled={valuesByPriority.every(({ getIsDisabled }) => {
          return getIsDisabled({ editor, config: configs[dropdown.name] });
        })}
        className={classNames(classes.select)}
        onClick={() => (isOpen ? closeModalWithFocus() : openDropdown())}
      >
        <div className={classes.value}>
          {showIcon && (
            <span>
              <Icon className={classNames(classes.icon, classes.shownValue)} />
            </span>
          )}
          {showText && <span className={classes.shownValue}>{t(text)}</span>}
          {otherValues.map(({ text, iconConfig }) => {
            const OtherValueIcon = iconConfig?.Icon;

            if (OtherValueIcon) {
              return (
                <span tabIndex={-1} key={text} className={classes.hidden} aria-hidden="true">
                  <OtherValueIcon className={classes.hidden} />
                </span>
              );
            }

            return (
              <span key={text} className={classes.hidden} aria-hidden="true">
                {t(text)}
              </span>
            );
          })}
        </div>
        <div className={classes.arrowContainer}>
          <ChevronDown
            className={classNames(classes.arrow, {
              [classes.arrowOpen]: isOpen,
            })}
          />
        </div>
      </button>
      {isOpen && (
        <ToolbarModal>
          <ul
            id={dropdown.name}
            role="listbox"
            aria-label={t(dropdown.name)}
            ref={setDropdownList}
            className={classNames(classes.dropdownItemsContainer)}
            data-testid={`${dropdown.name}-dropdown-items`}
          >
            {valuesByPriority.map(
              ({ text, iconConfig, getIsDisabled, name, className, onClick, belongsTo }, index) => {
                const isLastItem = index === valuesByPriority.length - 1;
                const isFirstItem = index === 0;
                const { Icon, type } = iconConfig || {};

                const itemIcon = Icon ? (
                  <Icon
                    className={classNames({
                      [classes.itemFill]: type === 'fill',
                      [classes.itemStroke]: type === 'stroke',
                    })}
                  />
                ) : null;

                return (
                  <li key={name} className={classes.dropdownItemContainer}>
                    <button
                      tabIndex={-1}
                      role="option"
                      aria-selected={selectedValue?.name === name}
                      aria-label={t(text)}
                      data-testid={name}
                      disabled={getIsDisabled({ editor, config: configs[belongsTo] })}
                      className={classNames(classes.dropdownItem, className, {
                        [classes.iconItem]: !!itemIcon,
                      })}
                      ref={ref => {
                        if (isFirstItem) {
                          setFirstItem(ref);
                        }
                        if (isLastItem) {
                          setLastItem(ref);
                        }
                      }}
                      onClick={() => {
                        closeModal();
                        onClick({ editor, config: configs[belongsTo] });
                      }}
                    >
                      {!!itemIcon && itemIcon}
                      {!itemIcon && t(text)}
                    </button>
                  </li>
                );
              }
            )}
          </ul>
        </ToolbarModal>
      )}
    </ToolbarModalContainer>
  );
};
