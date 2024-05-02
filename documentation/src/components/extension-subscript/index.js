import React from 'react';
import { Editor } from '@rrte/editor';
import { Subscript } from '@rrte/subscript';
import { Paragraph } from '@rrte/paragraph';
import classes from './styles.module.css';
import './styles.css';

function MyComponent() {
  return (
    <Editor
      content={undefined}
      editorExtensions={[Paragraph(), Subscript()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
