import React from "react";
import { Editor } from "@rrte/editor";
import { Highlight } from "@rrte/extension-highlight";
import { Paragraph } from "@rrte/extension-paragraph";
import { TextStyle } from "@rrte/extension-text-style";
import { Id } from "@rrte/extension-id";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[Paragraph(), Highlight(), TextStyle(), Id()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
