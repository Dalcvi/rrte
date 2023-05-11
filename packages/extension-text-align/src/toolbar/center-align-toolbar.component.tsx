import { RegularButtonConfig } from '@rrte/common';
import { TextAlignExtension } from '../extension';
import { Editor } from '@tiptap/core';
import classNames from 'classnames';
import classes from './toolbar.module.scss';
import AlignCenterIcon from './align-center.icon.svg';
import { TextAlignConfig } from '../text-align-config';

const TextAlignToolbarButton = ({ editor, config }: { editor: Editor; config: TextAlignConfig }) => {
  const isActive = config.types.some((type) => editor.isActive(type, { textAlign: 'center' }));
  return (
    <button
      data-testid="text-align-center-button"
      aria-label="text align center"
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
  text: 'Text align center',
  type: 'icon' as const,
  priority: 1,
};
