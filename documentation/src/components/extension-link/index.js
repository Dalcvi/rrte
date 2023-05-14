import React from "react";
import { Editor } from "@rrte/editor";
import { Link } from "@rrte/extension-link";
import { Paragraph } from "@rrte/extension-paragraph";
import { Gapcursor } from "@rrte/extension-gapcursor";
import classes from "./styles.module.css";
import { useState } from "react";

function MyComponent() {
  const [content, setContent] = useState(undefined);

  return (
    <div>
      <Editor
        onUpdateJson={setContent}
        content={content}
        extensions={[Paragraph(), Link(), Gapcursor()]}
        contentWrapperClassName={classes.contentWrapper}
      />

      <Editor
        content={content}
        viewerMode
        extensions={[Paragraph(), Link(), Gapcursor()]}
        contentWrapperClassName={classes.contentWrapper}
      />
    </div>
  );
}

export default MyComponent;
