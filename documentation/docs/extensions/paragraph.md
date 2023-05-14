---
sidebar_position: 1
---

# Paragraph

Enables creation of paragraph element.

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/extension-paragraph
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/extension-paragraph
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/extension-paragraph
```

  </TabItem>
</Tabs>

## Options

| Option name    | Type                  | description                                             |
| -------------- | --------------------- | ------------------------------------------------------- |
| HTMLAttributes | _Record<string, any>_ | HTML attributes to be applied to the paragraph element. |

## Functions

| Function name | Parameters | Description                     |
| ------------- | ---------- | ------------------------------- |
| setParagraph  | -          | Sets selected node as paragraph |

## Example

import ParagraphExample from '@site/src/components/extension-paragraph';

```jsx
import { Editor } from "@rrte/editor";
import { Paragraph } from "@rrte/extension-paragraph";

function MyComponent() {
  return <Editor content={undefined} extensions={[Paragraph()]} />;
}

export default MyComponent;
```

<ParagraphExample />
