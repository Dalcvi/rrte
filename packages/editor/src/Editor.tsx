import * as React from 'react';
import { useEditor, EditorContent, AnyExtension, JSONContent } from '@tiptap/react';
import { Document } from '@rrte/extension-document';
import { Paragraph } from '@rrte/extension-paragraph';
import { Text } from '@rrte/extension-text';
import type { EditorExtension } from '@rrte/common-types';

export const Editor = ({
  extensions = [],
  className,
  content,
  onUpdate,
}: {
  className?: string;
  extensions?: ReturnType<EditorExtension<AnyExtension, unknown>>[];
  content: JSONContent | undefined;
  onUpdate: (content: JSONContent | undefined) => void;
}) => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, ...extensions.map(({ extension }) => extension)],
    editorProps:
      className !== undefined
        ? {
            attributes: {
              class: className,
            },
          }
        : undefined,
    content,
  });

  React.useEffect(() => {
    if (editor !== null && content === undefined) {
      onUpdate(editor.getJSON());
    }
  }, [content, editor, onUpdate]);

  React.useEffect(() => {
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

  return <EditorContent editor={editor} />;
};
