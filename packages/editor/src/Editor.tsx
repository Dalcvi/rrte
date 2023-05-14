import { useEditor, EditorContent, JSONContent, HTMLContent } from '@tiptap/react';
import { Document } from '@rrte/extension-document';
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
  editorWrapperClassName,
  toolbarClassName,
  editorRef,
  contentClassName,
  contentWrapperClassName,
  content,
  viewerMode,
  onUpdateJson,
  onUpdateHtml,
}: {
  toolbarClassName?: string;
  editorWrapperClassName?: string;
  editorRef?: React.MutableRefObject<EditorRef>;
  contentClassName?: string;
  contentWrapperClassName?: string;
  viewerMode?: boolean;
  extensions?: UnknownExtension[];
  content: JSONContent | HTMLContent | undefined;
  onUpdateJson?: (content: JSONContent | undefined) => void;
  onUpdateHtml?: (content: HTMLContent | undefined) => void;
}) => {
  const [contentHasBeenSet, setContentHasBeenSet] = useState(false);
  const allBubbleMenus = useMemo(
    () =>
      extensions.reduce((acc, { extension, config }) => {
        if (config.bubbleMenu) {
          return [...acc, { name: extension.name, menu: config.bubbleMenu, config }];
        }
        return acc;
      }, [] as { name: string; menu: BubbleMenuToolbar; config: Config }[]),
    [extensions],
  );
  const editor = useEditor({
    extensions: [Document, Text, ...extensions.map(({ extension }) => extension)],
    content,
    editable: !viewerMode,
    editorProps: contentClassName
      ? {
          attributes: {
            class: contentClassName,
          },
        }
      : undefined,
  });

  console.log(editor);
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
    setContentHasBeenSet(true && !viewerMode);
    editor.commands.setContent(content);
  }, [content]);

  return (
    <div className={`${classes.editorWrapper} ${editorWrapperClassName}`}>
      {editor && !viewerMode && (
        <Toolbar
          editor={editor}
          wrapperClassName={toolbarClassName}
          items={
            extensions
              .map((extension) => ({ toolbar: extension.config.toolbar, config: extension.config }))
              .filter((toolbar) => !!toolbar.toolbar) as { toolbar: ToolbarItem<any>; config: any }[]
          }
        />
      )}
      <div className={`${classes.editorContent}  ${contentWrapperClassName}`}>
        <EditorContent editor={editor} data-testid="rrte-editor" />
      </div>
      {editor && !viewerMode && allBubbleMenus.length > 0 && <BubbleMenuList editor={editor} list={allBubbleMenus} />}
    </div>
  );
};
