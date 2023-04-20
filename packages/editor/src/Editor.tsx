import * as React from 'react';
import { useEditor, EditorContent, JSONContent, AnyExtension } from '@tiptap/react';
import { Document } from '@rrte/extension-document';
import { Paragraph } from '@rrte/extension-paragraph';
import { Text } from '@rrte/extension-text';
import type { UnknownExtension } from '@rrte/common';

export const Editor = ({
  extensions = [],
  className,
  content,
  onUpdate,
}: {
  className?: string;
  extensions?: UnknownExtension[];
  content: JSONContent | undefined;
  onUpdate: (content: JSONContent | undefined) => void;
}) => {
  console.log(extensions.map(({ extension }) => extension));
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
