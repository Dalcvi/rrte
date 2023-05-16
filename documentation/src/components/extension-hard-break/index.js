import React from "react";
import { Editor } from "@rrte/editor";
import { Paragraph } from "@rrte/extension-paragraph";
import { HardBreak } from "@rrte/extension-hard-break";
import { BulletList } from "@rrte/extension-bullet-list";
import { ListItem } from "@rrte/extension-list-item";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[Paragraph(), HardBreak(), ListItem(), BulletList()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
