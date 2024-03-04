import React from "react";
import { Editor } from "@rrte/editor";
import { History } from "@rrte/history";
import { Paragraph } from "@rrte/paragraph";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      editorExtensions={[Paragraph(), History()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
