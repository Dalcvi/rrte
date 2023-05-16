import React from "react";
import { Editor } from "@rrte/editor";
import { Subscript } from "@rrte/extension-subscript";
import { Paragraph } from "@rrte/extension-paragraph";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[Paragraph(), Subscript()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
