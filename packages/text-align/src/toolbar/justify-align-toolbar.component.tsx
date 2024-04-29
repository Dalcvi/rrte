import { RegularButtonConfig } from '@rrte/common';
import classNames from 'classnames';
import { TextAlignExtension } from '../extension';
import { TextAlignConfig } from '../text-align-config';
import AlignJustifyIcon from './align-justify.icon.svg';
import classes from './toolbar.module.scss';

const TextAlignToolbarButton: RegularButtonConfig<TextAlignConfig>['Button'] = ({
  editor,
  config,
}) => {
  const isActive = config.types.some(type => editor.isActive(type, { textAlign: 'justify' }));
  return (
    <button
      data-testid="text-align-justify-button"
      aria-label={'justify-align-button.text'}
      className={classNames(classes.textAlignButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().setTextAlign('justify').run();
      }}
      disabled={!editor.can().setTextAlign('justify')}
    >
      <AlignJustifyIcon
        height={'15px'}
        width={'15px'}
        className={classNames(classes.icon, {
          [classes.active]: isActive,
        })}
      />
    </button>
  );
};

export const JustifyAlignToolbarButton: RegularButtonConfig<TextAlignConfig> = {
  Button: TextAlignToolbarButton,
  name: `${TextAlignExtension.name}-justify`,
  text: 'justify-align-button.text',
  type: 'icon' as const,
  priority: 89,
};
