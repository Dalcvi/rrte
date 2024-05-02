import React from 'react';
import { Editor } from '@rrte/editor';
import { Placeholder } from '@rrte/placeholder';
import { Paragraph } from '@rrte/paragraph';
import classes from './styles.module.css';
import './styles.css';

function MyComponent() {
  return (
    <Editor
      content={undefined}
      editorExtensions={[Paragraph(), Placeholder()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
