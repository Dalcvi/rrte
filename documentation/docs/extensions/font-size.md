# Font size

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/font-size
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/font-size
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/font-size
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

| Function name | Parameters     | Description                          |
| ------------- | -------------- | ------------------------------------ |
| setFontSize   | _size: number_ | Set the selection as given font size |
| unsetFontSize | -              | Removes set font size from selection |

## Example

```jsx
import { Editor } from '@rrte/editor';
import { FontSize } from '@rrte/font-size';
import { Paragraph } from '@rrte/paragraph';
import { TextStyle } from '@rrte/text-style';

function MyComponent() {
  return <Editor content={undefined} editorExtensions={[Paragraph(), FontSize(), TextStyle()]} />;
}

export default MyComponent;
```

import FontSizeExample from '@site/src/components/extension-font-size';

<FontSizeExample />
