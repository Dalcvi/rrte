import type { Editor } from '@tiptap/react';
import { InputIconButtonConfig } from '.';
import { useTranslations } from '@rrte/i18n';
import classNames from 'classnames';
import classes from './regular-button.module.scss';
import { forwardRef, useState } from 'react';

export const InputIconButton = forwardRef<
  HTMLButtonElement,
  {
    Icon: InputIconButtonConfig['Icon'];
    text: InputIconButtonConfig['text'];
    iconStyling: InputIconButtonConfig['iconStyling'];
    onChange: InputIconButtonConfig['onChange'];
    getIsDisabled: InputIconButtonConfig['getIsDisabled'];
    getAcceptableFiles: InputIconButtonConfig['getAcceptableFiles'];
    editor: Editor;
    config: Record<string, any>;
  }
>(
  (
    props: {
      Icon: InputIconButtonConfig['Icon'];
      text: InputIconButtonConfig['text'];
      iconStyling: InputIconButtonConfig['iconStyling'];
      onChange: InputIconButtonConfig['onChange'];
      getIsDisabled: InputIconButtonConfig['getIsDisabled'];
      getAcceptableFiles: InputIconButtonConfig['getAcceptableFiles'];
      editor: Editor;
      config: Record<string, any>;
    },
    ref
  ) => {
    const { editor, config, Icon, onChange, text, iconStyling, getIsDisabled, getAcceptableFiles } =
      props;
    const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);
    const { t } = useTranslations();

    const isDisabled = getIsDisabled ? getIsDisabled({ ...props }) : false;

    return (
      <>
        <input
          tabIndex={-1}
          ref={setFileInput}
          type="file"
          disabled={isDisabled}
          accept={getAcceptableFiles({ ...props })}
          className={classes.input}
          value={''}
          onChange={async e => onChange(e, { editor, config })}
        />
        <button
          ref={ref}
          onClick={() => fileInput?.click()}
          aria-label={t(text)}
          disabled={isDisabled}
          className={classNames(classes.inputIconButton, {
            [classes.disabledButton]: isDisabled,
          })}
        >
          <Icon
            className={classNames(classes.icon, {
              [classes.fill]: iconStyling === 'fill',
              [classes.stroke]: iconStyling === 'stroke',
            })}
          />
        </button>
      </>
    );
  }
);
