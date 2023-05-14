import React from "react";
import { Editor } from "@rrte/editor";
import { Italic } from "@rrte/extension-italic";
import { Paragraph } from "@rrte/extension-paragraph";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[Paragraph(), Italic()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
