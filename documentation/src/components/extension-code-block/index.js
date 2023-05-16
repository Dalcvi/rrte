import React from "react";
import { Editor } from "@rrte/editor";
import { CodeBlock } from "@rrte/extension-code-block";
import { Paragraph } from "@rrte/extension-paragraph";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[Paragraph(), CodeBlock()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
