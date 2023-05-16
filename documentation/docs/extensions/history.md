# History

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/extension-history
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/extension-history
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/extension-history
```

  </TabItem>
</Tabs>

## Options

| Option name   | Type     | description                            |
| ------------- | -------- | -------------------------------------- |
| depth         | _number_ | Max group actions that can be saved    |
| newGroupDelay | _number_ | time until new action group is created |

## Functions

| Function name | Parameters | Description       |
| ------------- | ---------- | ----------------- |
| undo          | -          | Undos last action |
| redo          | -          | Redos undid actio |

## Example

To see dropcursor working, type in some text, select it, and try dragging it somewhere else in text.

```jsx
import { Editor } from "@rrte/editor";
import { Paragraph } from "@rrte/extension-paragraph";
import { History } from "@rrte/extension-history";

function MyComponent() {
  return <Editor content={undefined} extensions={[Paragraph(), History()]} />;
}

export default MyComponent;
```

import HistoryExample from '@site/src/components/extension-history';

<HistoryExample />
