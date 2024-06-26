# List item

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/list-item
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/list-item
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/list-item
```

  </TabItem>
</Tabs>

## Required extensions

- [Paragraph](paragraph)

## Options

| Option name    | Type                   | description                                             |
| -------------- | ---------------------- | ------------------------------------------------------- |
| HTMLAttributes | _Record\<string, any>_ | HTML attributes to be applied to the list item element. |

## Voice command translation keys

| Translation key               | Explanation      |
| ----------------------------- | ---------------- |
| voice-command.split-list-item | Set a list item  |
| voice-command.sink-list-item  | Sink a list item |
| voice-command.lift-list-item  | Lift a list item |
