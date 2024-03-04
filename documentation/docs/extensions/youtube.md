# Youtube

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/gif
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/gif
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/gif
```

  </TabItem>
</Tabs>

## Attributes

url: string;
videoId: string;
defaultWidth: number;
customSize: boolean | null;
customWidth: number;
alignment: 'left' | 'center' | 'right';

| Attribute name | Type                            | description                        |
| -------------- | ------------------------------- | ---------------------------------- |
| url            | _string_                        | Full video url                     |
| videoId        | _string_                        | Video id                           |
| defaultWidth   | _number_                        | Default width                      |
| customSize     | _boolean \| null_               | A toggle if user wants custom size |
| customWidth    | _number \| null_                | The custom width                   |
| alignment      | _"left" \| "center" \| "right"_ | Alignment in the editor            |

## Functions

| Function name | Parameters                | Description                         |
| ------------- | ------------------------- | ----------------------------------- |
| setYoutube    | _url: string; id: string_ | Sets selected node as youtube video |

## Example

```jsx
import { Editor } from '@rrte/editor';
import { Paragraph } from '@rrte/paragraph';
import { Youtube } from '@rrte/youtube';

function MyComponent() {
  return <Editor content={undefined} editorExtensions={[Youtube(), Paragraph()]} />;
}

export default MyComponent;
```

import YoutubeExample from '@site/src/components/extension-youtube';

<YoutubeExample />
