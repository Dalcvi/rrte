import React from "react";
import { Editor } from "@rrte/editor";
import { Superscript } from "@rrte/extension-superscript";
import { Paragraph } from "@rrte/extension-paragraph";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[Paragraph(), Superscript()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
