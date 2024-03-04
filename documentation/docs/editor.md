---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Editor

The editor component allows you to create and manipulate content. This guide provides an overview of how to use the editor and its various features.

## Installation

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/editor
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/editor
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/editor
```

  </TabItem>
</Tabs>

## Using the Editor

To use the editor, follow these steps:

```jsx
import { Editor } from "@rrte/editor";
import { Paragraph } from "@rrte/paragraph";


const MyComponent = () => {
  return <Editor content={undefined} extensions=[Paragraph()] />;
};
```

This example demonstrates how to render the editor component with no initial content.

For the editor to work, we need to have at least one extension, that is type of block, since the document extension expects it. In this example, we used the [paragraph extension.](extensions/paragraph)

## Getting content

To retrieve the content from the editor, you can use the onUpdateJson or onUpdateHtml callbacks. The editor supports two types of content: JSON and HTML.

```jsx
const MyComponent = () => {
  const [jsonContent, setJsonContent] = useState(undefined);
  const [htmlContent, setHtmlContent] = useState(undefined);

  return (
    <Editor
      content={jsonContent}
      onUpdateJson={setJsonContent}
      onUpdateHtml={setHtmlContent}
      extensions=[Paragraph()]
    />
  );
};
```

In this example, the editor component is set up to update the jsonContent and htmlContent states whenever the content changes.

## Adding extensions

You can enhance the functionality of the editor by adding extensions. Adding extensions is straightforward:

```jsx
import { Editor } from '@rrte/editor';
import { Heading } from '@rrte/heading';

const MyComponent = () => {
  return <Editor content={undefined} extensions=[Heading()] />;
};
```

Here, the editor is rendered with the Heading extension, which enables the use of heading elements.

## Editor styling

The editor provides three layers that you can style by assigning classnames:

- editorWrapperClassName - Styles the entire editor wrapper, which also wraps toolbars.
- toolbarClassName - Styles the toolbar wrapper.
- contentWrapperClassName - Styles the wrapper of the editor content.
- contentClassName - Styles the content wrapper itself.

It looks somewhat like this

```jsx
<div className={editorWrapperClassName}>
  <div className={toolbarClassName} />
  <div className={contentWrapperClassName}>
    <div className={contentClassName}></div>
  </div>
  <div id="bubble-menu" />
</div>
```

## Viewer mode

You can switch the editor into viewer mode by setting the viewerMode flag to true. In viewer mode, the editor becomes read-only, allowing users to view the content without editing it.

```jsx
import { Editor } from "@rrte/editor";

const MyComponent = () => {
  return <Editor content={undefined} viewerMode={true} extensions=[Paragraph()] />;
};
```

When viewerMode is enabled, the editor's toolbar and editing capabilities are disabled.

## Editor controls

If you need more control over the editor, you can access the underlying TipTap editor instance. For example, you might want to reset the content. Here's how you can achieve that:

```jsx
import { Editor } from "@rrte/editor";

const MyComponent = () => {
  const editor = useRef(null);

  const reset = () => {
    if (!editor.current) {
      return;
    }

    editor.current.commands.clearContent(true);
  };

  return (
    <div>
      <Editor content={undefined} editorRef={editor} extensions=[Paragraph()] />
      <button onClick={reset}>Reset</button>
    </div>
  );
};
```

In this example, a ref is used to access the editor instance, allowing you to call editor commands directly.

## Editor props

```ts
type EditorProps = {
  content: JSONContent | HTMLContent | undefined;
  onUpdateJson?: (content: JSONContent | undefined) => void;
  onUpdateHtml?: (content: HTMLContent | undefined) => void;
  extensions?: UnknownExtension[];
  viewerMode?: boolean;
  editorWrapperClassName?: string;
  toolbarClassName?: string;
  contentClassName?: string;
  contentWrapperClassName?: string;
  editorRef?: React.MutableRefObject<EditorRef>;
};
```
