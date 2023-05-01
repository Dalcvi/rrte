import { useEditor, EditorContent, JSONContent } from '@tiptap/react';
import { Document } from '@rrte/extension-document';
import { Paragraph } from '@rrte/extension-paragraph';
import { Text } from '@rrte/extension-text';
import type { UnknownExtension } from '@rrte/common';
import { Toolbar } from '@rrte/toolbar';
import type { ToolbarItem } from '@rrte/toolbar';
import { useEffect } from 'react';
import classes from './Editor.module.scss';

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
  const allExtensions = [Paragraph(), ...extensions];

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
            allExtensions.map((extension) => extension.config.toolbar).filter((toolbar) => !!toolbar) as ToolbarItem[]
          }
        />
      )}
      <div className={editorContentClassName}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
