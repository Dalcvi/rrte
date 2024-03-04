# Subscript

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/subscript
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/subscript
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/subscript
```

  </TabItem>
</Tabs>

## Options

| Option name    | Type                   | description                                             |
| -------------- | ---------------------- | ------------------------------------------------------- |
| HTMLAttributes | _Record\<string, any>_ | HTML attributes to be applied to the subscript element. |

## Functions

| Function name   | Parameters | Description                        |
| --------------- | ---------- | ---------------------------------- |
| setSubscript    | -          | Set the selection as subscript     |
| toggleSubscript | -          | Toggles the selection as subscript |
| unsetSubscript  | -          | Unset the selection as subscript   |

## Shortcuts

- _Mod-shift-d_: Toggle subscript

- _Mod-shift-D_: Toggle subscript

- You can use input rules to wrap text in subscript. The text must be wrapped with "~" from both sides.

## Example

```jsx
import { Editor } from '@rrte/editor';
import { Subscript } from '@rrte/subscript';
import { Paragraph } from '@rrte/paragraph';

function MyComponent() {
  return <Editor content={undefined} editorExtensions={[Paragraph(), Subscript()]} />;
}

export default MyComponent;
```

import SubscriptExample from '@site/src/components/extension-subscript';

<SubscriptExample />
