import React from "react";
import { Editor } from "@rrte/editor";
import { Dropcursor } from "@rrte/extension-dropcursor";
import { Paragraph } from "@rrte/extension-paragraph";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[Paragraph(), Dropcursor()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
