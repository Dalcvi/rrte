import React from 'react';
import { Editor } from '@rrte/editor';
import { Voice } from '@rrte/voice';
import { Paragraph } from '@rrte/paragraph';
import classes from './styles.module.css';
import './styles.css';

function MyComponent() {
  return (
    <Editor
      content={undefined}
      editorExtensions={[Paragraph(), Voice()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
