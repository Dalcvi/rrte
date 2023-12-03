import type { BubbleMenuToolbar } from '@rrte/common';
import classes from './link-bubble-menu.module.scss';
import { LinkMark } from '../mark';

const BubbleMenu: BubbleMenuToolbar['Menu'] = ({ editor }) => {
  const currentAttributes = editor.getAttributes(LinkMark.name) as { href?: string };

  return (
    <div className={classes.bubbleMenu}>
      <label className={classes.inputContainer}>
        URL:
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
      </label>
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
