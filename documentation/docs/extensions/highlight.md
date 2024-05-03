# Highlight

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/highlight
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/highlight
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/highlight
```

  </TabItem>
</Tabs>

## Required extensions

- [Text style](text-style)

## Optional extensions

- [Id](id) - for better style tracking

## Options

| Option name | Type     | description                                                                         |
| ----------- | -------- | ----------------------------------------------------------------------------------- |
| types       | _string_ | Types of extensions to extend (on default it is only [text style](text-style) mark) |

## Functions

| Function name  | Parameters              | Description                                 |
| -------------- | ----------------------- | ------------------------------------------- |
| setHighlight   | _color: string \| null_ | Set the background color of selection       |
| unsetHighlight | -                       | Removes set background color from selection |

## Voice command translation keys

| Translation key                | Explanation      |
| ------------------------------ | ---------------- |
| voice-command.remove-highlight | Remove highlight |

## Example

```jsx
import { Editor } from '@rrte/editor';
import { Highlight } from '@rrte/highlight';
import { Paragraph } from '@rrte/paragraph';
import { TextStyle } from '@rrte/text-style';

function MyComponent() {
  return <Editor content={undefined} editorExtensions={[Paragraph(), Highlight(), TextStyle()]} />;
}

export default MyComponent;
```

import HighlightExample from '@site/src/components/extension-highlight';

<HighlightExample />
