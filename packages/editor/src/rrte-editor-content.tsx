import React from 'react';
import classes from './Editor.module.scss';
import { Editor, EditorContent } from '@tiptap/react';
import { useEditorSlot } from '@rrte/common';
import classnames from 'classnames';

export const RrteEditorContent = React.forwardRef<
  HTMLDivElement,
  { editor: Editor | null; contentWrapperClassName?: string }
>(({ editor, contentWrapperClassName }, ref) => {
  const { isUsingSlot } = useEditorSlot();
  return (
    <div
      className={classnames(
        classes.editorContent,
        isUsingSlot && classes.editorContentWithSlot,
        !!contentWrapperClassName && contentWrapperClassName
      )}
      ref={ref}
    >
      <EditorContent editor={editor} data-testid="rrte-editor" />
    </div>
  );
});
