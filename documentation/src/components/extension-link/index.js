import React from 'react';
import { Editor } from '@rrte/editor';
import { Link } from '@rrte/link';
import { Paragraph } from '@rrte/paragraph';
import { Gapcursor } from '@rrte/gapcursor';
import classes from './styles.module.css';
import './styles.css';
import { useState } from 'react';

function MyComponent() {
  const [content, setContent] = useState(undefined);

  return (
    <div>
      <Editor
        onUpdateJson={setContent}
        content={content}
        editorExtensions={[Paragraph(), Link(), Gapcursor()]}
        contentWrapperClassName={classes.contentWrapper}
      />

      <Editor
        content={content}
        viewerMode
        editorExtensions={[Paragraph(), Link(), Gapcursor()]}
        contentWrapperClassName={classes.contentWrapper}
      />
    </div>
  );
}

export default MyComponent;
