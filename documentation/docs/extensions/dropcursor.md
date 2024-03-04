# Dropcursor

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/dropcursor
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/dropcursor
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/dropcursor
```

  </TabItem>
</Tabs>

## Options

| Option name | Type     | description                         |
| ----------- | -------- | ----------------------------------- |
| color       | _string_ | Color of the fake cursor            |
| width       | _number_ | Width of the fake cursor)           |
| class       | _string_ | Class that is applied to the cursor |

## Example

To see dropcursor working, type in some text, select it, and try dragging it somewhere else in text.

```jsx
import { Editor } from '@rrte/editor';
import { Paragraph } from '@rrte/paragraph';
import { Dropcursor } from '@rrte/drop-cursor';

function MyComponent() {
  return <Editor content={undefined} editorExtensions={[Paragraph(), Dropcursor()]} />;
}

export default MyComponent;
```

import DropcursorExample from '@site/src/components/extension-dropcursor';

<DropcursorExample />
