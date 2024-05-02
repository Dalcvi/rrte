import React from 'react';
import { Editor } from '@rrte/editor';
import { Highlight } from '@rrte/highlight';
import { Paragraph } from '@rrte/paragraph';
import { TextStyle } from '@rrte/text-style';
import { Id } from '@rrte/id';
import classes from './styles.module.css';
import './styles.css';

function MyComponent() {
  return (
    <Editor
      content={undefined}
      editorExtensions={[Paragraph(), Highlight(), TextStyle(), Id()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
