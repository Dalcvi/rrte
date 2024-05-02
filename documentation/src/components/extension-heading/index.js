import React from 'react';
import { Editor } from '@rrte/editor';
import { Heading } from '@rrte/heading';
import classes from './styles.module.css';
import './styles.css';

function MyComponent() {
  return (
    <Editor
      content={undefined}
      editorExtensions={[Heading()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
