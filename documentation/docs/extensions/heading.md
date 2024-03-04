# Heading

Enables creation of header elements. From h1 to h6.

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/heading
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/heading
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/heading
```

  </TabItem>
</Tabs>

## Options

| Option name    | Type                   | description                                           |
| -------------- | ---------------------- | ----------------------------------------------------- |
| HTMLAttributes | _Record\<string, any>_ | HTML attributes to be applied to the heading element. |
| Levels         | number[]               | Heading levels                                        |

## Functions

| Function name | Parameters                    | Description                       |
| ------------- | ----------------------------- | --------------------------------- |
| setHeading    | attributes: \{ level: Level } | Sets the selected node to heading |
| toggleHeading | attributes: \{ level: Level } | Toggles heading node              |

## Example

```jsx
import { Editor } from '@rrte/editor';
import { Heading } from '@rrte/heading';

function MyComponent() {
  return <Editor content={undefined} editorExtensions={[Heading()]} />;
}

export default MyComponent;
```

import HeadingExample from '@site/src/components/extension-heading';

<HeadingExample />
