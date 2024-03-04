import React from 'react';
import { Editor } from '@rrte/editor';
import { Bold } from '@rrte/bold';
import { TextAlign } from '@rrte/text-align';
import { Paragraph } from '@rrte/paragraph';
import classes from './styles.module.css';

function MyComponent() {
  return (
    <Editor
      content={undefined}
      editorExtensions={[
        TextAlign().extend({
          createConfigExtension: currentConfig => {
            return {
              ...currentConfig,
              toolbar: currentConfig.toolbar.map((toolbarItem, index) => ({
                ...toolbarItem,
                priority: index,
              })),
            };
          },
        }),
        Paragraph(),
        Bold(),
      ]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
