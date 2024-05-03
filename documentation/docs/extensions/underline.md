# Underline

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/underline
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/underline
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/underline
```

  </TabItem>
</Tabs>

## Options

| Option name    | Type                   | description                                             |
| -------------- | ---------------------- | ------------------------------------------------------- |
| HTMLAttributes | _Record\<string, any>_ | HTML attributes to be applied to the underline element. |

## Functions

| Function name   | Parameters | Description                        |
| --------------- | ---------- | ---------------------------------- |
| setUnderline    | -          | Set the selection as underline     |
| toggleUnderline | -          | Toggles the selection as underline |
| unsetUnderline  | -          | Unset the selection as underline   |

## Voice command translation keys

| Translation key                | Explanation      |
| ------------------------------ | ---------------- |
| voice-command.toggle-underline | Toggle underline |

## Shortcuts

- _Mod-U_: Toggle underline

- _Mod-u_: Toggle underline

- You can use input rules to wrap text in underline. The text must be wrapped with "-_" from start and "_-" at the end.

## Example

```jsx
import { Editor } from '@rrte/editor';
import { Underline } from '@rrte/underline';
import { Paragraph } from '@rrte/paragraph';

function MyComponent() {
  return <Editor content={undefined} editorExtensions={[Paragraph(), Underline()]} />;
}

export default MyComponent;
```

import UnderlineExample from '@site/src/components/extension-underline';

<UnderlineExample />
