import React from "react";
import { Editor } from "@rrte/editor";
import { OrderedList } from "@rrte/extension-ordered-list";
import { ListItem } from "@rrte/extension-list-item";
import { Paragraph } from "@rrte/extension-paragraph";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[ListItem(), OrderedList(), Paragraph()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
