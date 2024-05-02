import React from 'react';
import { Editor } from '@rrte/editor';
import { Dropcursor } from '@rrte/dropcursor';
import { Paragraph } from '@rrte/paragraph';
import classes from './styles.module.css';
import './styles.css';

function MyComponent() {
  return (
    <Editor
      content={undefined}
      editorExtensions={[Paragraph(), Dropcursor()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
