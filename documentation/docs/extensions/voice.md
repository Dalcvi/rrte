# Voice

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/voice
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/voice
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/voice
```

  </TabItem>
</Tabs>

## Voice command translation keys

| Translation key      | Explanation              |
| -------------------- | ------------------------ |
| begin-dictation-mode | Turns on dictation mode  |
| exit-dictation-mode  | Turns off dictation mode |

## Example

```jsx
import { Editor } from '@rrte/editor';
import { Voice } from '@rrte/voice';
import { Paragraph } from '@rrte/paragraph';

function MyComponent() {
  return (
    <Editor
      content={undefined}
      editorExtensions={[Paragraph(), Voice()]}
      contentWrapperClassName={classes.contentWrapper}
    />
  );

export default MyComponent;
```

import VoiceExample from '@site/src/components/extension-voice';

<VoiceExample />
