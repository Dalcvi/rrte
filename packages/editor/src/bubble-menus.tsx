import { BubbleMenuToolbar } from '@rrte/common';
import { useTranslations } from '@rrte/i18n';
import { BubbleMenu, Editor } from '@tiptap/react';

export const BubbleMenuList = ({
  list,
  editor,
}: {
  list: { name: string; menu: BubbleMenuToolbar; config: Record<string, any> }[];
  editor: Editor;
}) => {
  const { t } = useTranslations();

  return (
    <>
      {list.map(({ name, menu, config }) => {
        const { Menu, tippyOptions, ...bubbleMenuProps } = menu;
        return (
          <BubbleMenu
            editor={editor}
            key={name}
            updateDelay={0}
            tippyOptions={tippyOptions && tippyOptions(editor)}
            {...bubbleMenuProps}
          >
            <Menu editor={editor} config={config} t={t} />
          </BubbleMenu>
        );
      })}
    </>
  );
};
