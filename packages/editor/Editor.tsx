import * as React from "react";
import { useEditor, EditorContent, AnyExtension } from '@tiptap/react'
import { Document } from "@rrte/extension-document";
import { Paragraph } from "@rrte/extension-paragraph";
import { Text } from "@rrte/extension-text";
import type { EditorExtension } from '@rrte/common-types';
import classes from './Editor.module.css';

export const Editor = ({
  extensions = []
}: {
  extensions?: ReturnType<EditorExtension<AnyExtension, unknown>>[]
}) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      ...extensions.map(({extension}) => extension),
    ],
        editorProps: {
    attributes: {
      class: classes.editor,
    },
  },
  }
  )

  return (<div className={classes.siteContainer}>
          <EditorContent editor={editor} />
          {editor !== null && <div className={classes.schemaContainer}>
            <pre>
              {JSON.stringify(editor.getJSON(), null, 6) }
            </pre>
          </div>}
    </div>
  )
}