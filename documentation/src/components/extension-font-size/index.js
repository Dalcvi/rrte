import React from "react";
import { Editor } from "@rrte/editor";
import { FontSize } from "@rrte/extension-font-size";
import { Paragraph } from "@rrte/extension-paragraph";
import { TextStyle } from "@rrte/extension-text-style";
import { Id } from "@rrte/extension-id";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[Paragraph(), FontSize(), TextStyle(), Id()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
