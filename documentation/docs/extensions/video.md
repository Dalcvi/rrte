# Video

## Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install @rrte/video
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add  @rrte/video
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @rrte/video
```

  </TabItem>
</Tabs>

## Required extensions

- [Id](id)

## Creation parameters

### User controlled

| Option name            | Type                                                                                 | Description                                            |
| ---------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| type                   | "user-controlled"                                                                    | Sets the type for better typescript support            |
| onVideoAddClick        | _() => Promise\<\{ tempFile: VideoReturnValue;finalFile: Promise\<VideoReturn\>;}\>_ | Function that is called when the add button is clicked |
| acceptedVideoFileTypes | string[]                                                                             | All types of videos accepted, for example: "video/mp4" |
| maxFileSize            | number                                                                               | Max file size in bytes                                 |
| onPaste                | (file: File, videoAttr: NeededVideoAttributes) => Promise\<VideoReturn\>             | Handler for when an video gets pasted/dropped in       |

### Extension controlled

| Option name            | Type                                                                       | Description                                                        |
| ---------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| type                   | "extension-controlled"                                                     | Sets the type for better typescript support                        |
| onVideoAdd             | _(file: File, videoAttr: NeededVideoAttributes) => Promise\<VideoReturn\>_ | Function that is called after user selects a file from file picker |
| acceptedVideoFileTypes | string[]                                                                   | All types of videos accepted, for example: "video/webp"            |
| maxFileSize            | number                                                                     | Max file size in bytes                                             |

## Options

| Option name            | Type                                                                                      | Description                                                        |
| ---------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| HTMLAttributes         | _Record\<string, any>_                                                                    | HTML attributes to be applied to the video element.                |
| upload                 | _((file: File, videoAttr: NeededVideoAttributes) => Promise\<VideoReturn\>) \| undefined_ | Function for uploading files when user drops in or pastes an video |
| acceptedVideoFileTypes | string[]                                                                                  | All types of videos accepted, for example: "video/webp"            |
| maxFileSize            | number                                                                                    | Max file size in bytes                                             |

## Attributes

| Attribute name | Type                            | description                                 |
| -------------- | ------------------------------- | ------------------------------------------- |
| src            | _string_                        | Source of the video                         |
| alt            | _string \| null_                | Alt for img tag, when webp is available     |
| customSize     | _boolean \| null_               | A toggle if user wants custom size          |
| customWidth    | _number \| null_                | The custom width                            |
| customHeight   | _number \| null_                | The custom height                           |
| isLoading      | _boolean_                       | Used while temporary video is showed height |
| alignment      | _"left" \| "center" \| "right"_ | Alignment in the editor                     |

## Functions

| Function name | Parameters                                      | Description                                           |
| ------------- | ----------------------------------------------- | ----------------------------------------------------- |
| setVideo      | options: Partial\<VideoAttributes\>             | Sets the selection as video node                      |
| updateVideo   | options: Partial\<VideoAttributes\>, id: string | Updates attributes of video that matches the given id |
| removeVideo   | id: string                                      | Removes video by id                                   |

## Example

### User controlled

```jsx
import { Editor } from '@rrte/editor';
import { Paragraph } from '@rrte/paragraph';
import { Video } from '@rrte/video';
import { Id } from '@rrte/id';

function MyComponent() {
  return (
    <Editor
      content={undefined}
      editorExtensions={[
        Id(),
        Video({
          type: 'user-controlled',
          maxFileSize: 100000000,
          acceptedVideoFileTypes: ['video/mp4', 'video/mov'],
          onVideoAddClick: async () => {
            const tempFile = {
              // src to a video
              src: 'https://www.w3schools.com/html/mov_bbb.mp4',
            };
            const finalFile = new Promise(resolve =>
              setTimeout(resolve, 1000, {
                src: 'https://www.w3schools.com/html/mov_bbb.mp4',
              })
            );

            return { tempFile, finalFile };
          },
          onPaste: async (file, videoAttr) =>
            new Promise() < VideoAttributes > (resolve => setTimeout(resolve, 1000, videoAttr)),
        }),
        Paragraph(),
      ]}
    />
  );
}

export default MyComponent;
```

import { UserControlledVideo, ExtensionControlledVideo} from '@site/src/components/extension-video';

<UserControlledVideo />

### Extension controlled

```jsx
import { Editor } from '@rrte/editor';
import { Paragraph } from '@rrte/paragraph';
import { Video } from '@rrte/video';
import { Id } from '@rrte/id';

function MyComponent() {
  return (
    <Editor
      content={undefined}
      editorExtensions={[
        Id(),
        Video({
          type: 'extension-controlled',
          maxFileSize: 100000000,
          onVideoAdd: async (file, videoAttr) => {
            return videoAttr;
          },
          acceptedVideoFileTypes: ['video/mp4', 'video/mov'],
        }),
        Paragraph(),
      ]}
    />
  );
}

export default MyComponent;
```

<ExtensionControlledVideo />
