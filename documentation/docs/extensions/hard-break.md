# Hard break

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/extension-hard-break
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/extension-hard-break
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/extension-hard-break
```

  </TabItem>
</Tabs>

## Options

| Option name    | Type                   | description                                              |
| -------------- | ---------------------- | -------------------------------------------------------- |
| HTMLAttributes | _Record\<string, any>_ | HTML attributes to be applied to the hard break element. |
| keepMarks      | boolean                | If the text after hard break should keep marks           |

## Functions

| Function name | Parameters | Description      |
| ------------- | ---------- | ---------------- |
| setHardBreak  | -          | Adds a hardbreak |

## Shortcuts

- _Shift-enter_: Add hard break

- _Mod-enter_: Add hard break

## Example

```jsx
import { Editor } from "@rrte/editor";
import { Paragraph } from "@rrte/extension-paragraph";
import { HardBreak } from "@rrte/extension-hard-break";
import { BulletList } from "@rrte/extension-bullet-list";
import { ListItem } from "@rrte/extension-list-item";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[Paragraph(), HardBreak(), BulletList(), ListItem()]}
    />
  );
}

export default MyComponent;
```

For the example the [bullet list](bullet-list) extension is used, so we can see how not a full new line is created.

import HardBreakExample from '@site/src/components/extension-hard-break';

<HardBreakExample />
