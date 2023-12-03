# Image

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/extension-image
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/extension-image
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/extension-image
```

  </TabItem>
</Tabs>

## Required extensions

- [Id](id)

## Creation parameters

### User controlled

| Option name            | Type                                                                                | Description                                             |
| ---------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------- |
| type                   | "user-controlled"                                                                   | Sets the type for better typescript support             |
| onImageAddClick        | _() => Promise\<\{tempFile: ImageReturnValue;finalFile: Promise\<ImageReturn\>;}\>_ | Function that is called when the add button is clicked  |
| acceptedImageFileTypes | string[]                                                                            | All types of images accepted, for example: "image/webp" |
| maxFileSize            | number                                                                              | Max file size in bytes                                  |
| onPaste                | (file: File, imgAttr: NeededImageAttributes) => Promise\<ImageReturn\>              | Handler for when an image gets pasted/dropped in        |

### Extension controlled

| Option name            | Type                                                                     | Description                                                        |
| ---------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| type                   | "extension-controlled"                                                   | Sets the type for better typescript support                        |
| onImageAdd             | _(file: File, imgAttr: NeededImageAttributes) => Promise\<ImageReturn\>_ | Function that is called after user selects a file from file picker |
| acceptedImageFileTypes | string[]                                                                 | All types of images accepted, for example: "image/webp"            |
| maxFileSize            | number                                                                   | Max file size in bytes                                             |

## Options

| Option name            | Type                                                                                    | Description                                                        |
| ---------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| HTMLAttributes         | _Record\<string, any>_                                                                  | HTML attributes to be applied to the image element.                |
| upload                 | _((file: File, imgAttr: NeededImageAttributes) => Promise\<ImageReturn\>) \| undefined_ | Function for uploading files when user drops in or pastes an image |
| acceptedImageFileTypes | string[]                                                                                | All types of images accepted, for example: "image/webp"            |
| maxFileSize            | number                                                                                  | Max file size in bytes                                             |

## Attributes

| Attribute name | Type                            | description                                 |
| -------------- | ------------------------------- | ------------------------------------------- |
| src            | _string_                        | Source of the image                         |
| originalWidth  | _number_                        | Original width of the gif                   |
| originalHeight | _number_                        | Original height of the gif                  |
| alt            | _string \| null_                | Alt for img tag, when webp is available     |
| customSize     | _boolean \| null_               | A toggle if user wants custom size          |
| customWidth    | _number \| null_                | The custom width                            |
| customHeight   | _number \| null_                | The custom height                           |
| isLoading      | _boolean_                       | Used while temporary image is showed height |
| alignment      | _"left" \| "center" \| "right"_ | Alignment in the editor                     |

## Functions

| Function name | Parameters                                      | Description                                           |
| ------------- | ----------------------------------------------- | ----------------------------------------------------- |
| setImage      | options: Partial\<ImageAttributes\>             | Sets the selection as image node                      |
| updateImage   | options: Partial\<ImageAttributes\>, id: string | Updates attributes of image that matches the given id |
| removeImage   | id: string                                      | Removes image by id                                   |

## Example

### User controlled

```jsx
import { Editor } from "@rrte/editor";
import { Paragraph } from "@rrte/extension-paragraph";
import { Image } from "@rrte/extension-image";
import { Id } from "@rrte/extension-id";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[
        Id(),
        Image({
          type: "user-controlled",
          maxFileSize: 100000000,
          acceptedImageFileTypes: ["image/jpeg", "image/png"],
          onImageAddClick: async () => {
            const tempFile = {
              src: "https://picsum.photos/300/200",
              originalHeight: 200,
              originalWidth: 300,
            };
            const finalFile =
              new Promise() <
              ImageAttributes >
              ((resolve) =>
                setTimeout(resolve, 1000, {
                  src: "https://picsum.photos/200/300",
                  originalHeight: 300,
                  originalWidth: 200,
                }));

            return { tempFile, finalFile };
          },
          onPaste: async (file, imgAttr) =>
            new Promise() <
            ImageAttributes >
            ((resolve) => setTimeout(resolve, 1000, imgAttr)),
        }),
        Paragraph(),
      ]}
    />
  );
}

export default MyComponent;
```

import { UserControlledImage, ExtensionControlledImage} from '@site/src/components/extension-image';

<UserControlledImage />

### Extension controlled

```jsx
import { Editor } from "@rrte/editor";
import { Paragraph } from "@rrte/extension-paragraph";
import { Image } from "@rrte/extension-image";
import { Id } from "@rrte/extension-id";

function MyComponent() {
  return (
    <Editor
      content={undefined}
      extensions={[
        Id(),
        Image({
          type: "extension-controlled",
          maxFileSize: 100000000,
          onImageAdd: async (file, imgAttr) => {
            return imgAttr;
          },
          acceptedImageFileTypes: ["image/jpeg", "image/png"],
        }),
        Paragraph(),
      ]}
    />
  );
}

export default MyComponent;
```

<ExtensionControlledImage />
