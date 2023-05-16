import React from "react";
import { Editor } from "@rrte/editor";
import { Bold } from "@rrte/extension-bold";
import { Paragraph } from "@rrte/extension-paragraph";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[Paragraph(), Bold()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
