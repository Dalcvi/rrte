# Color

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/extension-color
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/extension-color
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/extension-color
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

| Function name | Parameters              | Description                      |
| ------------- | ----------------------- | -------------------------------- |
| setColor      | _color: string \| null_ | Set the selection as given color |
| unsetColor    | -                       | Removes set color from selection |

## Example

```jsx
import { Editor } from "@rrte/editor";
import { Color } from "@rrte/extension-color";
import { Paragraph } from "@rrte/extension-paragraph";
import { TextStyle } from "@rrte/extension-text-style";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[Paragraph(), Color(), TextStyle()]}
    />
  );
}

export default MyComponent;
```

import ColorExample from '@site/src/components/extension-color';

<ColorExample />
