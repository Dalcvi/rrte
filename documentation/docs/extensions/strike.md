# Strike

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/strike
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/strike
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/strike
```

  </TabItem>
</Tabs>

## Options

| Option name    | Type                   | description                                          |
| -------------- | ---------------------- | ---------------------------------------------------- |
| HTMLAttributes | _Record\<string, any>_ | HTML attributes to be applied to the strike element. |

## Functions

| Function name | Parameters | Description                     |
| ------------- | ---------- | ------------------------------- |
| setStrike     | -          | Set the selection as strike     |
| toggleStrike  | -          | Toggles the selection as strike |
| unsetStrike   | -          | Unset the selection as strike   |

## Shortcuts

- _Mod-S_: Toggle strike

- _Mod-s_: Toggle strike

- You can use input rules to wrap text in strike. The text must be wrapped with "~~" from both sides.

## Example

```jsx
import { Editor } from '@rrte/editor';
import { Strike } from '@rrte/strike';
import { Paragraph } from '@rrte/paragraph';

function MyComponent() {
  return <Editor content={undefined} editorExtensions={[Paragraph(), Strike()]} />;
}

export default MyComponent;
```

import StrikeExample from '@site/src/components/extension-strike';

<StrikeExample />
