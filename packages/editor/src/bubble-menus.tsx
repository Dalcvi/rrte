import { BubbleMenuToolbar } from '@rrte/common';
import { BubbleMenu, Editor } from '@tiptap/react';

export const BubbleMenuList = ({
  list,
  editor,
}: {
  list: { name: string; menu: BubbleMenuToolbar; config: Record<string, any> }[];
  editor: Editor;
}) => {
  return (
    <>
      {list.map(({ name, menu, config }) => {
        const { Menu, ...bubbleMenuProps } = menu;
        return (
          <BubbleMenu editor={editor} key={name} {...bubbleMenuProps}>
            <Menu editor={editor} config={config} />
          </BubbleMenu>
        );
      })}
    </>
  );
};
