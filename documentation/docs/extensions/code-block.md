# Code block

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/code-block
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/code-block
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/code-block
```

  </TabItem>
</Tabs>

## Required extensions

- [Paragraph](paragraph)

## Options

| Option name       | Type                   | description                                              |
| ----------------- | ---------------------- | -------------------------------------------------------- |
| HTMLAttributes    | _Record\<string, any>_ | HTML attributes to be applied to the code block element. |
| exitOnTripleEnter | boolean                | Should the node be exited on triple enter.               |
| exitOnArrowDown   | boolean                | Should the node be exited on arrow down.                 |

## Functions

| Function name   | Parameters | Description                   |
| --------------- | ---------- | ----------------------------- |
| setCodeBlock    | -          | Set the node as code block    |
| toggleCodeBlock | -          | Toggles the node as codeblock |

## Shortcuts

- _Mod-Alt-c_: Toggle code

- To wrap text in code with input rules, use "```" around the text from both sides.

## Example

```jsx
import { Editor } from '@rrte/editor';
import { CodeBlock } from '@rrte/code-block';
import { Paragraph } from '@rrte/paragraph';

function MyComponent() {
  return <Editor content={undefined} editorExtensions={[Paragraph(), CodeBlock()]} />;
}

export default MyComponent;
```

import CodeBlockExample from '@site/src/components/extension-code-block';

<CodeBlockExample />
