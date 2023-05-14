import React from "react";
import { Editor } from "@rrte/editor";
import { Heading } from "@rrte/extension-heading";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[Heading()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
