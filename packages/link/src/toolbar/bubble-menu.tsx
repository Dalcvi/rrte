import type { BubbleMenuToolbar } from '@rrte/common';
import classes from './link-bubble-menu.module.scss';
import { LinkMark } from '../mark';
import { TextInput } from '@rrte/toolbar';

const BubbleMenu: BubbleMenuToolbar['Menu'] = ({ editor, t }) => {
  const currentAttributes = editor.getAttributes(LinkMark.name) as { href?: string };

  return (
    <div className={classes.bubbleMenu}>
      <TextInput
        label={t('link-address.label')}
        value={currentAttributes.href ?? ''}
        onChange={val => {
          editor
            .chain()
            .extendMarkRange(LinkMark.name)
            .updateAttributes(LinkMark.name, {
              href: val,
            })
            .run();
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === 'Escape') {
            const focusTo = editor.state.selection.$to.pos;

            editor.commands.focus(focusTo);
          }
        }}
      />
      {/* <label className={classes.inputContainer}>
        {t('link-address.label')}
        <input
          aria-label="link url"
          data-testid="link-input"
          type="text"
          className={classes.input}
          value={currentAttributes.href}
          onChange={e => {
            editor
              .chain()
              .extendMarkRange(LinkMark.name)
              .updateAttributes(LinkMark.name, {
                href: e.target.value,
              })
              .run();
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === 'Escape') {
              const focusTo = editor.state.selection.$to.pos;

              editor.commands.focus(focusTo);
            }
          }}
        />
      </label> */}
    </div>
  );
};

export const LinkBubbleMenu: BubbleMenuToolbar = {
  Menu: BubbleMenu,
  shouldShow: ({ editor }) => {
    return (
      editor.isActive(LinkMark.name) && editor.state.selection.$from.parent.textContent.length > 0
    );
  },
};
