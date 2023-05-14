import React from "react";
import { Editor } from "@rrte/editor";
import { Underline } from "@rrte/extension-underline";
import { Paragraph } from "@rrte/extension-paragraph";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[Paragraph(), Underline()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
