import React from "react";
import { Editor } from "@rrte/editor";
import { Blockquote } from "@rrte/blockquote";
import { Paragraph } from "@rrte/paragraph";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      editorExtensions={[Paragraph(), Blockquote()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
