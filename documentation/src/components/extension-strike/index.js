import React from "react";
import { Editor } from "@rrte/editor";
import { Strike } from "@rrte/extension-strike";
import { Paragraph } from "@rrte/extension-paragraph";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[Paragraph(), Strike()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
