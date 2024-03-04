# Text style

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/text-style
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/text-style
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/text-style
```

  </TabItem>
</Tabs>

## Options

| Option name    | Type                   | description                                               |
| -------------- | ---------------------- | --------------------------------------------------------- |
| HTMLAttributes | _Record\<string, any>_ | HTML attributes to be applied to the superscript element. |

## Functions

| Function name        | Parameters | Description                              |
| -------------------- | ---------- | ---------------------------------------- |
| removeEmptyTextStyle | -          | Removes the text style mark if its empty |

## Example

```jsx
import { Editor } from '@rrte/editor';
import { TextStyle } from '@rrte/text-style';
import { Paragraph } from '@rrte/paragraph';

function MyComponent() {
  return <Editor content={undefined} editorExtensions={[Paragraph(), TextStyle()]} />;
}

export default MyComponent;
```
