import React from "react";
import { Editor } from "@rrte/editor";
import { Blockquote } from "@rrte/extension-blockquote";
import { Paragraph } from "@rrte/extension-paragraph";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[Paragraph(), Blockquote()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
