import { useEditor, EditorContent, JSONContent, HTMLContent } from '@tiptap/react';
import { Document } from '@rrte/extension-document';
import { Paragraph } from '@rrte/extension-paragraph';
import { Text } from '@rrte/extension-text';
import type { UnknownExtension, BubbleMenuToolbar, Config } from '@rrte/common';
import { Toolbar } from '@rrte/toolbar';
import type { ToolbarItem } from '@rrte/toolbar';
import { useEffect, useMemo, useState } from 'react';
import classes from './Editor.module.scss';
import { BubbleMenuList } from './bubble-menus';

export type EditorRef = ReturnType<typeof useEditor>;

export const Editor = ({
  extensions = [],
  className,
  editorRef,
  editorContentClassName,
  editorContentWrapperClassName,
  content,
  viewerMode,
  onUpdateJson,
  onUpdateHtml,
}: {
  className?: string;
  editorRef?: React.MutableRefObject<EditorRef>;
  editorContentClassName?: string;
  editorContentWrapperClassName?: string;
  viewerMode?: boolean;
  extensions?: UnknownExtension[];
  content: JSONContent | HTMLContent | undefined;
  onUpdateJson?: (content: JSONContent | undefined) => void;
  onUpdateHtml?: (content: HTMLContent | undefined) => void;
}) => {
  const [contentHasBeenSet, setContentHasBeenSet] = useState(false);
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
    editable: !viewerMode,
    editorProps: editorContentClassName
      ? {
          attributes: {
            class: editorContentClassName,
          },
        }
      : undefined,
  });

  useEffect(() => {
    if (editorRef && editorRef.current !== editor) {
      editorRef.current = editor;
    }
  }, [editorRef, editor]);

  useEffect(() => {
    if (editor !== null && content === undefined) {
      if (onUpdateJson) {
        onUpdateJson(editor.getJSON());
      }

      if (onUpdateHtml) {
        onUpdateHtml(editor.getHTML());
      }
    }
  }, [content, editor, onUpdateHtml, onUpdateJson]);

  useEffect(() => {
    if (editor === null) {
      return;
    }
    const updateFunc = () => {
      if (onUpdateJson) {
        onUpdateJson(editor.getJSON());
      }

      if (onUpdateHtml) {
        onUpdateHtml(editor.getHTML());
      }
    };

    editor.on('update', updateFunc);

    return () => {
      editor.off('update', updateFunc);
    };
  }, [editor, onUpdateHtml, onUpdateJson]);

  useEffect(() => {
    if (contentHasBeenSet || editor === null || content === undefined) {
      return;
    }
    setContentHasBeenSet(true);
    editor.commands.setContent(content);
  }, [content]);

  return (
    <div className={`${classes.editorWrapper} ${className}`}>
      {editor && !viewerMode && (
        <Toolbar
          editor={editor}
          items={
            allExtensions
              .map((extension) => ({ toolbar: extension.config.toolbar, config: extension.config }))
              .filter((toolbar) => !!toolbar.toolbar) as { toolbar: ToolbarItem<any>; config: any }[]
          }
        />
      )}
      <div className={`${classes.editorContent}  ${editorContentWrapperClassName}`}>
        <EditorContent editor={editor} data-hook="rrte-editor" />
      </div>
      {editor && !viewerMode && allBubbleMenus.length > 0 && <BubbleMenuList editor={editor} list={allBubbleMenus} />}
    </div>
  );
};
