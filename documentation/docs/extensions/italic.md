# Italic

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/extension-italic
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/extension-italic
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/extension-italic
```

  </TabItem>
</Tabs>

## Options

| Option name    | Type                   | description                                          |
| -------------- | ---------------------- | ---------------------------------------------------- |
| HTMLAttributes | _Record\<string, any>_ | HTML attributes to be applied to the italic element. |

## Functions

| Function name | Parameters | Description                     |
| ------------- | ---------- | ------------------------------- |
| setItalic     | -          | Set the selection as italic     |
| toggleItalic  | -          | Toggles the selection as italic |
| unsetItalic   | -          | Unset the selection as italic   |

## Shortcuts

- _Mod-I_: Toggle italic

- _Mod-i_: Toggle italic

- You can use input rules to wrap text in italic. The text must be wrapped with "\*" or "\_" from both sides.

## Example

```jsx
import { Editor } from "@rrte/editor";
import { Italic } from "@rrte/extension-italic";
import { Paragraph } from "@rrte/extension-paragraph";

function MyComponent() {
  return <Editor content={undefined} extensions={[Paragraph(), Italic()]} />;
}

export default MyComponent;
```

import ItalicExample from '@site/src/components/extension-italic';

<ItalicExample />
