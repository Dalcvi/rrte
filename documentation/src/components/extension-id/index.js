import React from 'react';
import { Editor } from '@rrte/editor';
import { Paragraph } from '@rrte/paragraph';
import { Id } from '@rrte/id';
import classes from './styles.module.css';
import './styles.css';
import { useState } from 'react';

function MyComponent() {
  const [content, setContent] = useState(undefined);
  return (
    <div>
      <Editor
        content={content}
        onUpdateJson={setContent}
        editorExtensions={[Paragraph(), Id()]}
        contentWrapperClassName={classes.contentWrapper}
      />
      <pre>{JSON.stringify(content, null, 2)}</pre>
    </div>
  );
}

export default MyComponent;
