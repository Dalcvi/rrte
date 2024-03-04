# Id

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/id
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/id
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/id
```

  </TabItem>
</Tabs>

## Options

| Option name       | Type           | description                                  |
| ----------------- | -------------- | -------------------------------------------- |
| attributeName     | _number_       | Attribute name that attaches to wanted types |
| generateID        | _() => string_ | Function for generating Ids                  |
| types             | _number_       | Node types to generate ids for               |
| filterTransaction | _number_       | Id generation transaction filter             |

## Example

To see dropcursor working, type in some text, select it, and try dragging it somewhere else in text.

```jsx
function MyComponent() {
  const [content, setContent] = useState(undefined);
  return (
    <div>
      <Editor
        content={content}
        onUpdateJson={setContent}
        editorExtensions={[Paragraph(), Id()]}
        contentWrapperClassName={classes.contentWrapper}
      />
      <pre>{JSON.stringify(content, null, 2)}</pre>
    </div>
  );
}

export default MyComponent;
```

import IdExample from '@site/src/components/extension-id';

<IdExample />
