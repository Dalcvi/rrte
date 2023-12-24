import { RegularButtonConfig } from '@rrte/common';
import { TextAlignExtension } from '../extension';
import { Editor } from '@tiptap/core';
import classNames from 'classnames';
import classes from './toolbar.module.scss';
import AlignJustifyIcon from './align-justify.icon.svg';
import { TextAlignConfig } from '../text-align-config';

const TextAlignToolbarButton = ({
  editor,
  config,
}: {
  editor: Editor;
  config: TextAlignConfig;
}) => {
  const isActive = config.types.some(type => editor.isActive(type, { textAlign: 'justify' }));
  return (
    <button
      data-testid="text-align-justify-button"
      name="text align justify"
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
  text: 'Text align justify',
  type: 'icon' as const,
  priority: 89,
};
