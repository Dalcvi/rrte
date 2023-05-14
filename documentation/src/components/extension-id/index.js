import React from "react";
import { Editor } from "@rrte/editor";
import { Paragraph } from "@rrte/extension-paragraph";
import { Id } from "@rrte/extension-id";
import classes from "./styles.module.css";
import { useState } from "react";

function MyComponent() {
  const [content, setContent] = useState(undefined);
  return (
    <div>
      <Editor
        content={content}
        onUpdateJson={setContent}
        extensions={[Paragraph(), Id()]}
        contentWrapperClassName={classes.contentWrapper}
      />
      <pre>{JSON.stringify(content, null, 2)}</pre>
    </div>
  );
}

export default MyComponent;
