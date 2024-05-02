import React from 'react';
import { Editor } from '@rrte/editor';
import { Table, TableCell, TableRow, TableHeader } from '@rrte/table';
import { Paragraph } from '@rrte/paragraph';
import classes from './styles.module.css';
import './styles.css';

function MyComponent() {
  return (
    <Editor
      content={undefined}
      editorExtensions={[Paragraph(), Table(), TableCell(), TableRow(), TableHeader()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
