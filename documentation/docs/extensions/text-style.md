# Text style

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/extension-text-style
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/extension-text-style
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/extension-text-style
```

  </TabItem>
</Tabs>

## Options

| Option name    | Type                  | description                                               |
| -------------- | --------------------- | --------------------------------------------------------- |
| HTMLAttributes | _Record<string, any>_ | HTML attributes to be applied to the superscript element. |

## Functions

| Function name        | Parameters | Description                              |
| -------------------- | ---------- | ---------------------------------------- |
| removeEmptyTextStyle | -          | Removes the text style mark if its empty |

## Example

```jsx
import { Editor } from "@rrte/editor";
import { TextStyle } from "@rrte/extension-text-style";
import { Paragraph } from "@rrte/extension-paragraph";

function MyComponent() {
  return <Editor content={undefined} extensions={[Paragraph(), TextStyle()]} />;
}

export default MyComponent;
```
