import React from "react";
import { Editor } from "@rrte/editor";
import { Gif } from "@rrte/gif";
import { Paragraph } from "@rrte/paragraph";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      editorExtensions={[Gif("U2cUFPs3FgG3vLbp2DLXKRlUXn2N12bO"), Paragraph()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
