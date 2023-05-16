---
sidebar_position: 4
---

# Configuring

## Extension config

You can change the config of the extension. You can either extend the extension schema or change default configuration, for example the toolbar priority:

## Example

```jsx
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
```

import ConfigExample from '@site/src/components/config';

<ConfigExample />

## Css vars

To theme the editor and its extensions you need to override our css vars. The general convention would be to override something like `--css-var` you would need to specify a value for `--css-var-ovr`.

### All css vars

Here is all the css vars you can override:

```
--rrte-color-1-ovr
--rrte-color-2-ovr
--rrte-color-3-ovr
--rrte-color-4-ovr
--rrte-color-5-ovr
--rrte-color-6-ovr
--rrte-color-7-ovr
--rrte-color-8-ovr
--rrte-color-9-ovr
--rrte-blockquote-color-ovr
--rrte-blockquote-font-family-ovr
--rrte-blockquote-line-height-ovr
--rrte-blockquote-font-weight-ovr
--rrte-blockquote-text-decoration-ovr
--rrte-blockquote-font-style-ovr
--rrte-blockquote-font-size-ovr
--rrte-blockquote-padding-start-ovr
--rrte-blockquote-background-ovr
--rrte-blockquote-border-start-ovr
--rrte-blockquote-margin-ovr
--rrte-blockquote-width-ovr
--rrte-code-font-family-ovr
--rrte-code-font-size-ovr
--rrte-code-line-height-ovr
--rrte-code-font-weight-ovr
--rrte-code-text-decoration-ovr
--rrte-code-font-style-ovr
--rrte-code-background-ovr
--rrte-code-color-ovr
--rrte-code-border-ovr
--rrte-code-border-radius-ovr
--rrte-code-padding-ovr
--rrte-code-width-ovr
--rrte-codeblock-color-ovr
--rrte-codeblock-font-family-ovr
--rrte-codeblock-font-size-ovr
--rrte-codeblock-line-height-ovr
--rrte-codeblock-font-weight-ovr
--rrte-codeblock-text-decoration-ovr
--rrte-codeblock-font-style-ovr
--rrte-codeblock-padding-start-ovr
--rrte-codeblock-background-ovr
--rrte-codeblock-border-start-ovr
--rrte-h1-color-ovr
--rrte-h1-font-family-ovr
--rrte-h1-font-size-ovr
--rrte-h1-line-height-ovr
--rrte-h1-font-weight-ovr
--rrte-h1-text-decoration-ovr
--rrte-h1-font-style-ovr
--rrte-h2-color-ovr
--rrte-h2-font-family-ovr
--rrte-h2-font-size-ovr
--rrte-h2-line-height-ovr
--rrte-h2-font-weight-ovr
--rrte-h2-text-decoration-ovr
--rrte-h2-font-style-ovr
--rrte-h3-color-ovr
--rrte-h3-font-family-ovr
--rrte-h3-font-size-ovr
--rrte-h3-line-height-ovr
--rrte-h3-font-weight-ovr
--rrte-h3-text-decoration-ovr
--rrte-h3-font-style-ovr
--rrte-h4-color-ovr
--rrte-h4-font-family-ovr
--rrte-h4-font-size-ovr
--rrte-h4-line-height-ovr
--rrte-h4-font-weight-ovr
--rrte-h4-text-decoration-ovr
--rrte-h4-font-style-ovr
--rrte-h5-color-ovr
--rrte-h5-font-family-ovr
--rrte-h5-font-size-ovr
--rrte-h5-line-height-ovr
--rrte-h5-font-weight-ovr
--rrte-h5-text-decoration-ovr
--rrte-h5-font-style-ovr
--rrte-h6-color-ovr
--rrte-h6-font-family-ovr
--rrte-h6-font-size-ovr
--rrte-h6-line-height-ovr
--rrte-h6-font-weight-ovr
--rrte-h6-text-decoration-ovr
--rrte-h6-font-style-ovr
--rrte-link-color-ovr
--rrte-link-font-ovr
--rrte-link-font-size-ovr
--rrte-link-font-weight-ovr
--rrte-link-text-decoration-ovr
--rrte-link-visited-color-ovr
--rrte-p-color-ovr
--rrte-p-font-family-ovr
--rrte-p-font-size-ovr
--rrte-p-line-height-ovr
--rrte-p-font-weight-ovr
--rrte-p-text-decoration-ovr
--rrte-p-font-style-ovr
--rrte-bullet-list-style-type-ovr
--rrte-bullet-list-style-position-ovr
--rrte-bullet-list-style-image-ovr
--rrte-bullet-list-margin-ovr
--rrte-bullet-list-padding-ovr
--rrte-bullet-list-color-ovr
--rrte-bullet-list-font-family-ovr
--rrte-bullet-list-font-size-ovr
--rrte-bullet-list-line-height-ovr
--rrte-bullet-list-font-weight-ovr
--rrte-bullet-list-text-decoration-ovr
--rrte-bullet-list-font-style-ovr
--rrte-ordered-list-style-type-ovr
--rrte-ordered-list-style-position-ovr
--rrte-ordered-list-style-image-ovr
--rrte-ordered-list-margin-ovr
--rrte-ordered-list-padding-ovr
--rrte-ordered-list-color-ovr
--rrte-ordered-list-font-family-ovr
--rrte-ordered-list-font-size-ovr
--rrte-ordered-list-line-height-ovr
--rrte-ordered-list-font-weight-ovr
--rrte-ordered-list-text-decoration-ovr
--rrte-ordered-list-font-style-ovr
```

### Example

Here is how overriding would look like:

```css title="styles.module.css"
.editor {
  min-height: 100vh;
  margin: 12px 24px;
  width: 80%;
  max-width: 80%;
  --rrte-color-1-ovr: 255, 123, 23;
  --rrte-color-2-ovr: 100, 25, 45;
  --rrte-color-3-ovr: 45, 90, 190;
  --rrte-color-4-ovr: 255, 255, 255;
  --rrte-color-5-ovr: 0, 0, 0;
  --rrte-color-6-ovr: 190, 190, 0;
  --rrte-color-7-ovr: 0, 190, 190;
  --rrte-color-8-ovr: 190, 0, 190;
  --rrte-color-9-ovr: 0, 0, 190;

  --rrte-blockquote-color-ovr: 40, 40, 180;
  --rrte-blockquote-font-family-ovr: helvetica;
  --rrte-blockquote-line-height-ovr: 2;
  --rrte-blockquote-font-weight-ovr: 500;
  --rrte-blockquote-text-decoration-ovr: underline;
  --rrte-blockquote-font-style-ovr: italic;
  --rrte-blockquote-font-size-ovr: 1.5rem;
  --rrte-blockquote-padding-start-ovr: 1rem;
  --rrte-blockquote-background-ovr: 255, 255, 255;
  --rrte-blockquote-border-start-ovr: 2px solid rgb(0, 39, 52);
  --rrte-blockquote-margin-ovr: 1rem;
  --rrte-blockquote-width-ovr: 100%;

  --rrte-code-font-family-ovr: monospace;
  --rrte-code-font-size-ovr: 1rem;
  --rrte-code-line-height-ovr: 1.5;
  --rrte-code-font-weight-ovr: 300;
  --rrte-code-text-decoration-ovr: none;
  --rrte-code-font-style-ovr: normal;
  --rrte-code-background-ovr: 22, 22, 22;
  --rrte-code-color-ovr: 155, 40, 220;
  --rrte-code-border-ovr: 1px solid rgb(0, 39, 52);
  --rrte-code-border-radius-ovr: 4px;
  --rrte-code-padding-ovr: 1rem;
  --rrte-code-width-ovr: 100%;

  --rrte-codeblock-color-ovr: 255, 255, 255;
  --rrte-codeblock-font-family-ovr: monospace;
  --rrte-codeblock-font-size-ovr: 1rem;
  --rrte-codeblock-line-height-ovr: 1.5;
  --rrte-codeblock-font-weight-ovr: 400;
  --rrte-codeblock-text-decoration-ovr: none;
  --rrte-codeblock-font-style-ovr: normal;
  --rrte-codeblock-padding-start-ovr: 1rem;
  --rrte-codeblock-background-ovr: 0, 0, 0;
  --rrte-codeblock-border-start-ovr: 2px solid rgb(0, 191, 255);

  --rrte-h1-color-ovr: 12, 180, 4;
  --rrte-h1-font-family-ovr: impact;
  --rrte-h1-font-size-ovr: 3rem;
  --rrte-h1-line-height-ovr: 1.5;
  --rrte-h1-font-weight-ovr: 400;
  --rrte-h1-text-decoration-ovr: none;
  --rrte-h1-font-style-ovr: normal;

  --rrte-h2-color-ovr: 12, 180, 4;
  --rrte-h2-font-family-ovr: impact;
  --rrte-h2-font-size-ovr: 2.5rem;
  --rrte-h2-line-height-ovr: 1.5;
  --rrte-h2-font-weight-ovr: 400;
  --rrte-h2-text-decoration-ovr: none;
  --rrte-h2-font-style-ovr: normal;

  --rrte-h3-color-ovr: 12, 180, 4;
  --rrte-h3-font-family-ovr: impact;
  --rrte-h3-font-size-ovr: 2rem;
  --rrte-h3-line-height-ovr: 1.5;
  --rrte-h3-font-weight-ovr: 400;
  --rrte-h3-text-decoration-ovr: none;
  --rrte-h3-font-style-ovr: normal;

  --rrte-h4-color-ovr: 12, 180, 4;
  --rrte-h4-font-family-ovr: impact;
  --rrte-h4-font-size-ovr: 1.5rem;
  --rrte-h4-line-height-ovr: 1.5;
  --rrte-h4-font-weight-ovr: 400;
  --rrte-h4-text-decoration-ovr: none;
  --rrte-h4-font-style-ovr: normal;

  --rrte-h5-color-ovr: 12, 180, 4;
  --rrte-h5-font-family-ovr: impact;
  --rrte-h5-font-size-ovr: 1.25rem;
  --rrte-h5-line-height-ovr: 1.5;
  --rrte-h5-font-weight-ovr: 400;
  --rrte-h5-text-decoration-ovr: none;
  --rrte-h5-font-style-ovr: normal;

  --rrte-h6-color-ovr: 12, 180, 4;
  --rrte-h6-font-family-ovr: impact;
  --rrte-h6-font-size-ovr: 1rem;
  --rrte-h6-line-height-ovr: 1.5;
  --rrte-h6-font-weight-ovr: 400;
  --rrte-h6-text-decoration-ovr: none;
  --rrte-h6-font-style-ovr: normal;

  --rrte-link-color-ovr: 0, 191, 255;
  --rrte-link-font-ovr: inherit;
  --rrte-link-font-size-ovr: inherit;
  --rrte-link-font-weight-ovr: inherit;
  --rrte-link-text-decoration-ovr: none;
  --rrte-link-visited-color-ovr: 0, 191, 255;

  --rrte-p-color-ovr: 255, 255, 255;
  --rrte-p-font-family-ovr: inherit;
  --rrte-p-font-size-ovr: inherit;
  --rrte-p-line-height-ovr: inherit;
  --rrte-p-font-weight-ovr: inherit;
  --rrte-p-text-decoration-ovr: none;
  --rrte-p-font-style-ovr: normal;

  --rrte-bullet-list-style-type-ovr: space-counter;
  --rrte-bullet-list-style-position-ovr: inside;
  --rrte-bullet-list-style-image-ovr: none;
  --rrte-bullet-list-margin-ovr: 0;
  --rrte-bullet-list-padding-ovr: 0;
  --rrte-bullet-list-color-ovr: 123, 123, 123;
  --rrte-bullet-list-font-family-ovr: inherit;
  --rrte-bullet-list-font-size-ovr: inherit;
  --rrte-bullet-list-line-height-ovr: inherit;
  --rrte-bullet-list-font-weight-ovr: inherit;
  --rrte-bullet-list-text-decoration-ovr: none;
  --rrte-bullet-list-font-style-ovr: normal;

  --rrte-ordered-list-style-type-ovr: upper-roman;
  --rrte-ordered-list-style-position-ovr: inside;
  --rrte-ordered-list-style-image-ovr: none;
  --rrte-ordered-list-margin-ovr: 0;
  --rrte-ordered-list-padding-ovr: 0;
  --rrte-ordered-list-color-ovr: 123, 123, 123;
  --rrte-ordered-list-font-family-ovr: inherit;
  --rrte-ordered-list-font-size-ovr: inherit;
  --rrte-ordered-list-line-height-ovr: inherit;
  --rrte-ordered-list-font-weight-ovr: inherit;
  --rrte-ordered-list-text-decoration-ovr: none;
  --rrte-ordered-list-font-style-ovr: normal;
}
.editorContentWrapper {
  border: 1px solid rgb(255, 35, 122);
  border-top: none;
  padding: 12px 18px;
}

.editorContent {
  min-height: 600px;
  outline: none;
  padding: 6px;
  width: 100%;
}
```

```jsx title="editor.jsx"
import classes from "./styles.module.css";

function MyComponent() {
  return (
    <Editor
      editorWrapperClassName={classes.editor}
      contentClassName={classes.content}
      contentWrapperClassName={classes.editorContentWrapper}
      content={undefined}
      extensions={[
        Blockquote(),
        Bold(),
        Color(),
        FontSize(),
        Id(),
        BulletList(),
        CodeBlock(),
        HardBreak(),
        Heading(),
        ListItem(),
        OrderedList(),
        Italic(),
        Link(),
        Underline(),
        Strike(),
        Code(),
        Subscript(),
        Superscript(),
        TextStyle(),
        TextAlign(),
        Paragraph(),
        Highlight(),
        History(),
        Gapcursor(),
        Gif("your SDK key"),
        Dropcursor(),
        ImageExtension({
          type: "user-controlled",
          maxFileSize: 100000000,
          acceptedImageFileTypes: ["image/jpeg", "image/png"],
          onImageAddClick: async () => {
            const tempFile = {
              src: "https://picsum.photos/300/200",
              originalHeight: 200,
              originalWidth: 300,
            };
            const finalFile = new Promise((resolve) =>
              setTimeout(resolve, 1000, {
                src: "https://picsum.photos/200/300",
                originalHeight: 300,
                originalWidth: 200,
              })
            );

            return { tempFile, finalFile };
          },
          onPaste: async (file, imgAttr) =>
            new Promise((resolve) => setTimeout(resolve, 1000, imgAttr)),
        }),
        Video({
          type: "user-controlled",
          onVideoAddClick: async () => {
            const tempFile = {
              // src to a video
              src: "https://www.w3schools.com/html/mov_bbb.mp4",
            };
            const finalFile = new Promise((resolve) =>
              setTimeout(resolve, 1000, {
                src: "https://www.w3schools.com/html/mov_bbb.mp4",
              })
            );

            return { tempFile, finalFile };
          },
          onPaste: async (file, videoAttr) =>
            new Promise((resolve) => setTimeout(resolve, 1000, videoAttr)),
          maxFileSize: 100000000,
          acceptedVideoFileTypes: ["video/mp4", "video/quicktime"],
        }),
        Youtube(),
      ]}
    />
  );
}
```

import ThemeExample from '@site/src/components/theming';

<ThemeExample />
