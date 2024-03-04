import React from "react";
import { Editor } from "@rrte/editor";
import { BulletList } from "@rrte/bullet-list";
import { ListItem } from "@rrte/list-item";
import { Paragraph } from "@rrte/paragraph";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      editorExtensions={[ListItem(), BulletList(), Paragraph()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
