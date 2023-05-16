import React from "react";
import { Editor } from "@rrte/editor";
import { TextAlign } from "@rrte/extension-text-align";
import { Paragraph } from "@rrte/extension-paragraph";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[Paragraph(), TextAlign()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
