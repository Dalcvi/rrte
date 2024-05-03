# Bullet list

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/bullet-list
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/bullet-list
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/bullet-list
```

  </TabItem>
</Tabs>

## Required extensions

- [List item](list-item)
- [Paragraph](paragraph) - needed by [list item](list-item)

## Options

| Option name    | Type                   | description                                                       |
| -------------- | ---------------------- | ----------------------------------------------------------------- |
| HTMLAttributes | _Record\<string, any>_ | HTML attributes to be applied to the bullet list element.         |
| itemTypeName   | _string_               | The name of extension that it supports as content                 |
| keepMarks      | _boolean_              | Whether to remove or to keep marks when toggling bullet list      |
| keepAttributes | _boolean_              | Whether to remove or to keep attributes when toggling bullet list |

## Functions

| Function name    | Parameters | Description              |
| ---------------- | ---------- | ------------------------ |
| toggleBulletList | -          | Toggles bullet list node |

## Voice command translation keys

| Translation key                  | Explanation          |
| -------------------------------- | -------------------- |
| voice-command.toggle-bullet-list | Toggle a bullet list |

## Shortcuts

- _Mod-Shift-8_: Toggle bullet list

- You can use input rules to add an bullet list. If the line starts "- " or with "\* " bullet list will be toggled.

## Example

```jsx
import { Editor } from '@rrte/editor';
import { Paragraph } from '@rrte/paragraph';
import { BulletList } from '@rrte/bullet-list';
import { ListItem } from '@rrte/list-item';

function MyComponent() {
  return <Editor content={undefined} editorExtensions={[BulletList(), ListItem(), Paragraph()]} />;
}

export default MyComponent;
```

import BulletListExample from '@site/src/components/extension-bullet-list';

<BulletListExample />
