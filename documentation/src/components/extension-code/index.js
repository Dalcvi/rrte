import React from "react";
import { Editor } from "@rrte/editor";
import { Code } from "@rrte/extension-code";
import { Paragraph } from "@rrte/extension-paragraph";
import { Gapcursor } from "@rrte/extension-gapcursor";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[Paragraph(), Code(), Gapcursor()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
