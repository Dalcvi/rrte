import { useEditor, EditorContent, JSONContent, BubbleMenu } from '@tiptap/react';
import { Document } from '@rrte/extension-document';
import { Paragraph } from '@rrte/extension-paragraph';
import { Text } from '@rrte/extension-text';
import type { UnknownExtension, BubbleMenuToolbar, Config } from '@rrte/common';
import { Toolbar } from '@rrte/toolbar';
import type { ToolbarItem } from '@rrte/toolbar';
import { useEffect, useMemo } from 'react';
import classes from './Editor.module.scss';
import { BubbleMenuList } from './bubble-menus';

export const Editor = ({
  extensions = [],
  className,
  editorContentClassName,
  content,
  onUpdate,
}: {
  className?: string;
  editorContentClassName?: string;
  extensions?: UnknownExtension[];
  content: JSONContent | undefined;
  onUpdate: (content: JSONContent | undefined) => void;
}) => {
  const allExtensions = useMemo(() => [Paragraph(), ...extensions] as UnknownExtension[], [extensions]);
  const allBubbleMenus = useMemo(
    () =>
      allExtensions.reduce((acc, { extension, config }) => {
        if (config.bubbleMenu) {
          return [...acc, { name: extension.name, menu: config.bubbleMenu, config }];
        }
        return acc;
      }, [] as { name: string; menu: BubbleMenuToolbar; config: Config }[]),
    [allExtensions],
  );
  const editor = useEditor({
    extensions: [Document, Text, ...allExtensions.map(({ extension }) => extension)],
    content,
  });

  useEffect(() => {
    if (editor !== null && content === undefined) {
      onUpdate(editor.getJSON());
    }
  }, [content, editor, onUpdate]);

  useEffect(() => {
    if (editor === null) {
      return;
    }
    editor.on('update', () => {
      onUpdate(editor.getJSON());
    });

    return () => {
      editor.off('update');
    };
  }, [editor, onUpdate]);
  return (
    <div className={`${classes.editorWrapper} ${className}`}>
      {editor && (
        <Toolbar
          editor={editor}
          items={
            allExtensions
              .map((extension) => ({ toolbar: extension.config.toolbar, config: extension.config }))
              .filter((toolbar) => !!toolbar.toolbar) as { toolbar: ToolbarItem<any>; config: any }[]
          }
        />
      )}
      <div className={editorContentClassName}>
        <EditorContent editor={editor} data-hook="rrce-editor" />
      </div>
      {editor && allBubbleMenus.length > 0 && <BubbleMenuList editor={editor} list={allBubbleMenus} />}
    </div>
  );
};
