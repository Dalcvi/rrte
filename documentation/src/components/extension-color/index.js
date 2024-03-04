import React from "react";
import { Editor } from "@rrte/editor";
import { Color } from "@rrte/color";
import { Paragraph } from "@rrte/paragraph";
import { TextStyle } from "@rrte/text-style";
import { Id } from "@rrte/id";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      editorExtensions={[Paragraph(), Color(), TextStyle(), Id()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
