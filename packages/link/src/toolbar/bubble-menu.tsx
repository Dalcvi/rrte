import type { BubbleMenuToolbar } from '@rrte/common';
import classes from './link-bubble-menu.module.scss';
import { LinkMark } from '../mark';
import { BubbleMenuWrapper, TextInput } from '@rrte/toolbar';
import { useState } from 'react';

const BubbleMenu: BubbleMenuToolbar['Menu'] = ({ editor, t }) => {
  const currentAttributes = editor.getAttributes(LinkMark.name) as { href?: string };
  const [firstBubbleMenuItem, setFirstBubbleMenuItem] = useState<HTMLElement | null>(null);

  return (
    <BubbleMenuWrapper firstChild={firstBubbleMenuItem}>
      <div className={classes.bubbleMenu}>
        <TextInput
          ref={setFirstBubbleMenuItem}
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
      </div>
    </BubbleMenuWrapper>
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
