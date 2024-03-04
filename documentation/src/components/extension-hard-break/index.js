import React from "react";
import { Editor } from "@rrte/editor";
import { Paragraph } from "@rrte/paragraph";
import { HardBreak } from "@rrte/hard-break";
import { BulletList } from "@rrte/bullet-list";
import { ListItem } from "@rrte/list-item";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      editorExtensions={[Paragraph(), HardBreak(), ListItem(), BulletList()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
