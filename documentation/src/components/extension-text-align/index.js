import React from "react";
import { Editor } from "@rrte/editor";
import { TextAlign } from "@rrte/text-align";
import { Paragraph } from "@rrte/paragraph";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      editorExtensions={[Paragraph(), TextAlign()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
