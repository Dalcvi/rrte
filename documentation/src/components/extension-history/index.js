import React from "react";
import { Editor } from "@rrte/editor";
import { History } from "@rrte/extension-history";
import { Paragraph } from "@rrte/extension-paragraph";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[Paragraph(), History()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
