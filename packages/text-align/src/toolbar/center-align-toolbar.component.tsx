import { RegularButtonConfig } from '@rrte/common';
import classNames from 'classnames';
import { TextAlignExtension } from '../extension';
import { TextAlignConfig } from '../text-align-config';
import AlignCenterIcon from './align-center.icon.svg';
import classes from './toolbar.module.scss';

const TextAlignToolbarButton: RegularButtonConfig<TextAlignConfig>['Button'] = ({
  editor,
  config,
  t,
}) => {
  const isActive = config.types.some(type => editor.isActive(type, { textAlign: 'center' }));
  return (
    <button
      data-testid="text-align-center-button"
      aria-label={t('center-align-button.text')}
      className={classNames(classes.textAlignButton, {
        [classes.active]: isActive,
      })}
      onClick={() => {
        editor.chain().focus().setTextAlign('center').run();
      }}
      disabled={!editor.can().setTextAlign('center')}
    >
      <AlignCenterIcon
        height={'15px'}
        width={'15px'}
        className={classNames(classes.icon, {
          [classes.active]: isActive,
        })}
      />
    </button>
  );
};

export const CenterAlignToolbarButton: RegularButtonConfig<TextAlignConfig> = {
  Button: TextAlignToolbarButton,
  name: `${TextAlignExtension.name}-center`,
  text: 'center-align-button.text',
  type: 'icon' as const,
  priority: 91,
};
