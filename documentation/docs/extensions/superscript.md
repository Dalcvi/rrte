# Superscript

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/superscript
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/superscript
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/superscript
```

  </TabItem>
</Tabs>

## Options

| Option name    | Type                   | description                                               |
| -------------- | ---------------------- | --------------------------------------------------------- |
| HTMLAttributes | _Record\<string, any>_ | HTML attributes to be applied to the superscript element. |

## Functions

| Function name     | Parameters | Description                          |
| ----------------- | ---------- | ------------------------------------ |
| setSuperscript    | -          | Set the selection as superscript     |
| toggleSuperscript | -          | Toggles the selection as superscript |
| unsetSuperscript  | -          | Unset the selection as superscript   |

## Voice command translation keys

| Translation key                  | Explanation        |
| -------------------------------- | ------------------ |
| voice-command.toggle-superscript | Toggle superscript |

## Shortcuts

- _Mod-shift-U_: Toggle superscript

- _Mod-shift-u_: Toggle superscript

- You can use input rules to wrap text in superscript. The text must be wrapped with "^" from both sides.

## Example

```jsx
import { Editor } from '@rrte/editor';
import { Superscript } from '@rrte/superscript';
import { Paragraph } from '@rrte/paragraph';

function MyComponent() {
  return <Editor content={undefined} editorExtensions={[Paragraph(), Superscript()]} />;
}

export default MyComponent;
```

import SuperscriptExample from '@site/src/components/extension-superscript';

<SuperscriptExample />
