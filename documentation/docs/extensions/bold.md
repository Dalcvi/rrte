# Bold

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/bold
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/bold
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/bold
```

  </TabItem>
</Tabs>

## Options

| Option name    | Type                   | description                                        |
| -------------- | ---------------------- | -------------------------------------------------- |
| HTMLAttributes | _Record\<string, any>_ | HTML attributes to be applied to the bold element. |

## Functions

| Function name | Parameters | Description                   |
| ------------- | ---------- | ----------------------------- |
| setBold       | -          | Set the selection as bold     |
| toggleBold    | -          | Toggles the selection as bold |
| unsetBold     | -          | Unset the selection as bold   |

## Voice command translation keys

| Translation key           | Explanation |
| ------------------------- | ----------- |
| voice-command.toggle-bold | Toggle bold |

## Shortcuts

- _Mod-B_: Toggle bold

- _Mod-b_: Toggle bold

- You can use input rules to wrap text in bold. The text must be wrapped with "\*\*" or "\_\_" from both sides.

## Example

```jsx
import { Editor } from '@rrte/editor';
import { Bold } from '@rrte/bold';
import { Paragraph } from '@rrte/paragraph';

function MyComponent() {
  return <Editor content={undefined} editorExtensions={[Paragraph(), Bold()]} />;
}

export default MyComponent;
```

import BoldExample from '@site/src/components/extension-bold';

<BoldExample />
