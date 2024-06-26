# Code

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/code
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/code
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/code
```

  </TabItem>
</Tabs>

## Optional extensions

- [Gapcursor](gapcursor) - needed for the ability to escape the mark with arrow keys

## Options

| Option name    | Type                   | description                                        |
| -------------- | ---------------------- | -------------------------------------------------- |
| HTMLAttributes | _Record\<string, any>_ | HTML attributes to be applied to the code element. |

## Functions

| Function name | Parameters | Description                   |
| ------------- | ---------- | ----------------------------- |
| setCode       | -          | Set the selection as code     |
| toggleCode    | -          | Toggles the selection as code |
| unsetCode     | -          | Unset the selection as code   |

## Voice command translation keys

| Translation key           | Explanation        |
| ------------------------- | ------------------ |
| voice-command.toggle-code | Toggle inline code |

## Shortcuts

- _Mod-Shift-c_: Toggle code

- To wrap text in code with input rules, use "`" around the text from both sides.

## Example

```jsx
import { Editor } from '@rrte/editor';
import { Code } from '@rrte/code';
import { Paragraph } from '@rrte/paragraph';
import { Gapcursor } from '@rrte/gapcursor';

function MyComponent() {
  return <Editor content={undefined} editorExtensions={[Paragraph(), Code(), Gapcursor()]} />;
}

export default MyComponent;
```

import CodeExample from '@site/src/components/extension-code';

<CodeExample />
