import React from "react";
import { Editor } from "@rrte/editor";
import { Italic } from "@rrte/italic";
import { Paragraph } from "@rrte/paragraph";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      editorExtensions={[Paragraph(), Italic()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
