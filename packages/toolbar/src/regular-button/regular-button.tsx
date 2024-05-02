import type { Editor } from '@tiptap/react';
import { RegularButtonConfig } from './';
import { useTranslations } from '@rrte/i18n';
import classNames from 'classnames';
import classes from './regular-button.module.scss';
import { forwardRef } from 'react';

export const RegularButton = forwardRef<
  HTMLButtonElement,
  {
    Icon: RegularButtonConfig['Icon'];
    text: RegularButtonConfig['text'];
    iconStyling: RegularButtonConfig['iconStyling'];
    getIsActive: RegularButtonConfig['getIsActive'];
    getIsDisabled: RegularButtonConfig['getIsDisabled'];
    onClick: RegularButtonConfig['onClick'];
    editor: Editor;
    config: Record<string, any>;
    secondaryTheme?: boolean;
  }
>(props => {
  const {
    editor,
    config,
    Icon,
    text,
    iconStyling,
    getIsActive,
    getIsDisabled,
    onClick,
    secondaryTheme,
  } = props;
  const { t } = useTranslations();

  const isActive = getIsActive ? getIsActive({ ...props }) : false;

  return (
    <button
      aria-label={t(text)}
      disabled={getIsDisabled({ ...props })}
      onClick={() => onClick({ editor, config })}
      className={classNames(classes.regularButton, {
        [classes.active]: isActive,
        [classes.secondaryTheme]: secondaryTheme,
      })}
    >
      <Icon
        className={classNames(classes.icon, {
          [classes.active]: isActive,
          [classes.fill]: iconStyling === 'fill',
          [classes.stroke]: iconStyling === 'stroke',
          [classes.secondaryTheme]: secondaryTheme,
        })}
      />
    </button>
  );
});
