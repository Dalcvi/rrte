# Ordered list

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/extension-ordered-list
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/extension-ordered-list
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/extension-ordered-list
```

  </TabItem>
</Tabs>

## Required extensions

- [List item](list-item)
- [Paragraph](paragraph) - needed by [list item](list-item)

## Options

| Option name    | Type                   | description                                                       |
| -------------- | ---------------------- | ----------------------------------------------------------------- |
| HTMLAttributes | _Record\<string, any>_ | HTML attributes to be applied to the ordered list element.        |
| itemTypeName   | _string_               | The name of extension that it supports as content                 |
| keepMarks      | _boolean_              | Whether to remove or to keep marks when toggling bullet list      |
| keepAttributes | _boolean_              | Whether to remove or to keep attributes when toggling bullet list |

## Functions

| Function name     | Parameters | Description               |
| ----------------- | ---------- | ------------------------- |
| toggleOrderedList | -          | Toggles ordered list node |

## Shortcuts

- _Mod-Shift-8_: Toggle bullet list

- You can use input rules to add an ordered list. If the line starts "1." and ordered list will be added. If it starts with other number than one, the count will start from that number.

## Example

```jsx
import { Editor } from "@rrte/editor";
import { Paragraph } from "@rrte/extension-paragraph";
import { OrderedList } from "@rrte/extension-ordered-list";
import { ListItem } from "@rrte/extension-list-item";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[OrderedList(), ListItem(), Paragraph()]}
    />
  );
}

export default MyComponent;
```

import OrderedListExample from '@site/src/components/extension-ordered-list';

<OrderedListExample />
