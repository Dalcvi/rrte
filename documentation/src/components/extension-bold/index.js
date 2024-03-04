import React from "react";
import { Editor } from "@rrte/editor";
import { Bold } from "@rrte/bold";
import { Paragraph } from "@rrte/paragraph";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      editorExtensions={[Paragraph(), Bold()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
