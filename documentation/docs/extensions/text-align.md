# Text align

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/text-align
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/text-align
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/text-align
```

  </TabItem>
</Tabs>

## Creation parameters

| Parameter name | Type       | Description                                          |
| -------------- | ---------- | ---------------------------------------------------- |
| attachToNodes  | _string[]_ | Sets the nodes to which this extension can attach to |

## Options

| Option name      | Type       | description                                 |
| ---------------- | ---------- | ------------------------------------------- |
| types            | _string[]_ | Nodes to which this extension can attach to |
| defaultAlignment | _string_   | The default alignment                       |

## Functions

| Function name | Parameters                                                             | Description                  |
| ------------- | ---------------------------------------------------------------------- | ---------------------------- |
| setTextAlign  | attributes: \{ textAlign: "left" \| "center" \| "right" \| "justify" } | Sets the selection alignment |

## Example

```jsx
import { Editor } from '@rrte/editor';
import { TextAlign } from '@rrte/text-align';
import { Paragraph } from '@rrte/paragraph';

function MyComponent() {
  return <Editor content={undefined} editorExtensions={[Paragraph(), TextAlign()]} />;
}

export default MyComponent;
```

import TextAlignExample from '@site/src/components/extension-text-align';

<TextAlignExample />
