import React from "react";
import { Editor } from "@rrte/editor";
import { Youtube } from "@rrte/youtube";
import { Paragraph } from "@rrte/paragraph";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      editorExtensions={[Youtube(), Paragraph()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
