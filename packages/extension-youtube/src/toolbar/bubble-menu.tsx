import type { BubbleMenuToolbar } from '@rrte/common';
import classes from './youtube-bubble-menu.module.scss';
import { YoutubeNode } from '../node';

const BubbleMenu: BubbleMenuToolbar['Menu'] = ({ editor }) => {
  const currentAttributes = editor.getAttributes(YoutubeNode.name) as { href?: string };

  return (
    <div className={classes.bubbleMenu}>
      <label className={classes.inputContainer}>
        URL:
        <input
          type="text"
          className={classes.input}
          value={currentAttributes.href}
          onChange={(e) => {
            editor
              .chain()
              .extendMarkRange(YoutubeNode.name)
              .updateAttributes(YoutubeNode.name, {
                href: e.target.value,
              })
              .run();
          }}
          onKeyDown={(e) => {
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

export const YoutubeBubbleMenu: BubbleMenuToolbar = {
  Menu: BubbleMenu,
  shouldShow: ({ editor }) => {
    return editor.isActive(YoutubeNode.name) && editor.state.selection.$from.parent.textContent.length > 0;
  },
};
