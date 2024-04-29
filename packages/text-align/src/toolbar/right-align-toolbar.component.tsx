import { RegularButtonConfig } from '@rrte/common';
import classNames from 'classnames';
import { TextAlignExtension } from '../extension';
import { TextAlignConfig } from '../text-align-config';
import AlignRightIcon from './align-right.icon.svg';
import classes from './toolbar.module.scss';

const TextAlignToolbarButton: RegularButtonConfig<TextAlignConfig>['Button'] = ({
  editor,
  config,
  t,
}) => {
  const isActive = config.types.some(type => editor.isActive(type, { textAlign: 'right' }));
  return (
    <button
      data-testid="text-align-right-button"
      aria-label={t('right-align-button.text')}
      className={classNames(classes.textAlignButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().setTextAlign('right').run();
      }}
      disabled={!editor.can().setTextAlign('right')}
    >
      <AlignRightIcon
        height={'15px'}
        width={'15px'}
        className={classNames(classes.icon, {
          [classes.active]: isActive,
        })}
      />
    </button>
  );
};

export const RightAlignToolbarButton: RegularButtonConfig<TextAlignConfig> = {
  Button: TextAlignToolbarButton,
  name: `${TextAlignExtension.name}-right`,
  text: 'right-align-button.text',
  type: 'icon' as const,
  priority: 90,
};
