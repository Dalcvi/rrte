# Blockquote

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/extension-blockquote
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/extension-blockquote
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/extension-blockquote
```

  </TabItem>
</Tabs>

## Required extensions

- [Paragraph](paragraph)

## Options

| Option name    | Type                   | Description                                              |
| -------------- | ---------------------- | -------------------------------------------------------- |
| HTMLAttributes | _Record\<string, any>_ | HTML attributes to be applied to the blockquote element. |

## Functions

| Function name    | Parameters | Description                      |
| ---------------- | ---------- | -------------------------------- |
| setBlockquote    | -          | Sets selected node as blockquote |
| toggleBlockquote | -          | Toggles blockquote node          |
| unsetBlockquote  | -          | Removes blockquote node          |

## Shortcuts

- _Mod-Shift-b_: Toggle blockquote

- You can use "> " at the start of the text to add a blockquote.

## Example

```jsx
import { Editor } from "@rrte/editor";
import { Paragraph } from "@rrte/extension-paragraph";
import { Blockquote } from "@rrte/extension-blockquote";

function MyComponent() {
  return (
    <Editor content={undefined} extensions={[Blockquote(), Paragraph()]} />
  );
}

export default MyComponent;
```

import BlockquoteExample from '@site/src/components/extension-blockquote';

<BlockquoteExample />
