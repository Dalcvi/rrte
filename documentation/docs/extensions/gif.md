# Gif

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/extension-gif
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/extension-gif
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/extension-gif
```

  </TabItem>
</Tabs>

## Creation parameters

| Name   | Type     | Description                          |
| ------ | -------- | ------------------------------------ |
| sdkKey | _string_ | Giphy sdk key used for fetching gifs |

## RRTE Config

| Name   | Type   | Description                          |
| ------ | ------ | ------------------------------------ |
| sdkKey | string | Giphy sdk key used for fetching gifs |

## Attributes

| Attribute name | Type                            | description                                                               |
| -------------- | ------------------------------- | ------------------------------------------------------------------------- |
| webp           | _string_                        | Webp format of the gif (Main format that should be used)                  |
| mp4            | _string_                        | Mp4 format of the gif (Secondary format, only when webp is not available) |
| originalWidth  | _number_                        | Original width of the gif                                                 |
| originalHeight | _number_                        | Original height of the gif                                                |
| alt            | _string \| null_                | Alt for img tag, when webp is available                                   |
| customSize     | _boolean \| null_               | A toggle if user wants custom size                                        |
| customWidth    | _number \| null_                | The custom width                                                          |
| customHeight   | _number \| null_                | The custom height                                                         |
| alignment      | _"left" \| "center" \| "right"_ | Alignment in the editor                                                   |

## Functions

| Function name | Parameters                                                                                 | Description               |
| ------------- | ------------------------------------------------------------------------------------------ | ------------------------- |
| setGif        | _webp?: string; mp4?: string; originalWidth: number; originalHeight: number; alt: string;_ | Sets selected node as gif |

## Example

```jsx
import { Editor } from "@rrte/editor";
import { Paragraph } from "@rrte/extension-paragraph";
import { Gif } from "@rrte/extension-gif";

function MyComponent() {
  return (
    <Editor content={undefined} extensions={[Gif("your SDK"), Paragraph()]} />
  );
}

export default MyComponent;
```

import GifExample from '@site/src/components/extension-gif';

<GifExample />
