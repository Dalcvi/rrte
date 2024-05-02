import React from 'react';
import { Editor } from '@rrte/editor';
import { Code } from '@rrte/code';
import { Paragraph } from '@rrte/paragraph';
import { Gapcursor } from '@rrte/gapcursor';
import classes from './styles.module.css';
import './styles.css';

function MyComponent() {
  return (
    <Editor
      content={undefined}
      editorExtensions={[Paragraph(), Code(), Gapcursor()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
