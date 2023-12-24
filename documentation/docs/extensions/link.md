# Link

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/extension-link
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/extension-link
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/extension-link
```

  </TabItem>
</Tabs>

## Optional extensions

- [Gapcursor](gapcursor) - needed for the ability to escape the mark with arrow keys

## Options

| Option name    | Type                                     | description                                                            |
| -------------- | ---------------------------------------- | ---------------------------------------------------------------------- |
| HTMLAttributes | _Record\<string, any>_                   | HTML attributes to be applied to the link element.                     |
| autolink       | _boolean_                                | Checks for links when writing and automatically creates links for them |
| protocols      | _Array\<LinkProtocolOptions \| string\>_ | Linkifyjs protocols                                                    |
| openOnClick    | _boolean_                                | Enables link clicking. Disabled in editing mode                        |
| linkOnPaste    | _boolean_                                | Enables link creation on pasting                                       |
| validate       | _(url: string) => boolean_               | validation function that is called when creating a link                |

## Functions

| Function name | Parameters                                               | Description                   |
| ------------- | -------------------------------------------------------- | ----------------------------- |
| setLink       | _attributes:\{ href: string; target?: string \| null }_  | Set the selection as link     |
| toggleCode    | _attributes: \{ href: string; target?: string \| null }_ | Toggles the selection as link |
| unsetLink     | -                                                        | Unset the selection as link   |

## Example

```jsx
import { Editor } from "@rrte/editor";
import { Link } from "@rrte/extension-link";
import { Paragraph } from "@rrte/extension-paragraph";
import { Gapcursor } from "@rrte/extension-gapcursor";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[Paragraph(), Link(), Gapcursor()]}
    />
  );
}

export default MyComponent;
```

import LinkExample from '@site/src/components/extension-link';

<LinkExample />
