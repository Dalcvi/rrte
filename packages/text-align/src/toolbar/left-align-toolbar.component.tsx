import { RegularButtonConfig } from '@rrte/common';
import classNames from 'classnames';
import { TextAlignExtension } from '../extension';
import { TextAlignConfig } from '../text-align-config';
import AlignLeftIcon from './align-left.icon.svg';
import classes from './toolbar.module.scss';

const TextAlignToolbarButton: RegularButtonConfig<TextAlignConfig>['Button'] = ({
  editor,
  config,
  t,
}) => {
  const isActive = config.types.some(type => editor.isActive(type, { textAlign: 'left' }));
  return (
    <button
      data-testid="text-align-left-button"
      aria-label={t('left-align-button.text')}
      className={classNames(classes.textAlignButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().setTextAlign('left').run();
      }}
      disabled={!editor.can().setTextAlign('left')}
    >
      <AlignLeftIcon
        height={'15px'}
        width={'15px'}
        className={classNames(classes.icon, {
          [classes.active]: isActive,
        })}
      />
    </button>
  );
};

export const LeftAlignToolbarButton: RegularButtonConfig<TextAlignConfig> = {
  Button: TextAlignToolbarButton,
  name: `${TextAlignExtension.name}-left`,
  text: 'left-align-button.text',
  type: 'icon' as const,
  priority: 92,
};
