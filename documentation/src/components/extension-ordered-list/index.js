import React from 'react';
import { Editor } from '@rrte/editor';
import { OrderedList } from '@rrte/ordered-list';
import { ListItem } from '@rrte/list-item';
import { Paragraph } from '@rrte/paragraph';
import classes from './styles.module.css';
import './styles.css';

function MyComponent() {
  return (
    <Editor
      content={undefined}
      editorExtensions={[ListItem(), OrderedList(), Paragraph()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
