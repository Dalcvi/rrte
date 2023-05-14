import React from "react";
import { Editor } from "@rrte/editor";
import { BulletList } from "@rrte/extension-bullet-list";
import { ListItem } from "@rrte/extension-list-item";
import { Paragraph } from "@rrte/extension-paragraph";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[ListItem(), BulletList(), Paragraph()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
