import React from "react";
import { Editor } from "@rrte/editor";
import { Bold } from "@rrte/extension-bold";
import { TextAlign } from "@rrte/extension-text-align";
import { Paragraph } from "@rrte/extension-paragraph";
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[
        TextAlign().extendConfig((currentConfig) => {
          return {
            ...currentConfig,
            toolbar: currentConfig.toolbar.map((toolbarItem, index) => ({
              ...toolbarItem,
              priority: index,
            })),
          };
        }),
        Paragraph(),
        Bold(),
      ]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );
}

export default MyComponent;
