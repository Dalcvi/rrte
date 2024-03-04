import { Editor } from "@rrte/editor";
import { Paragraph } from "@rrte/paragraph";
import { Video } from "@rrte/video";
import { Id } from "@rrte/id";
import React from "react";
import classes from "./styles.module.css";

export const UserControlledVideo = () => {
  return (
    <Editor
      content={undefined}
      contentWrapperClassName={classes.contentWrapper}
      editorExtensions={[
        Id(),
        Video({
          type: "user-controlled",
          maxFileSize: 100000000,
          acceptedVideoFileTypes: ["video/mp4"],
          onVideoAddClick: async () => {
            const tempFile = {
              // src to a video
              src: "https://www.w3schools.com/html/mov_bbb.mp4",
            };
            const finalFile = new Promise((resolve) =>
              setTimeout(resolve, 1000, {
                src: "https://www.w3schools.com/html/mov_bbb.mp4",
              })
            );

            return { tempFile, finalFile };
          },
          onPaste: async (file, videoAttr) =>
            new Promise() <
            VideoAttributes >
            ((resolve) => setTimeout(resolve, 1000, videoAttr)),
        }),
        Paragraph(),
      ]}
    />
  );
};

export const ExtensionControlledVideo = () => {
  return (
    <Editor
      content={undefined}
      contentWrapperClassName={classes.contentWrapper}
      editorExtensions={[
        Video({
          type: "extension-controlled",
          maxFileSize: 100000000,
          onVideoAdd: async (file, videoAttr) => {
            return videoAttr;
          },
          acceptedVideoFileTypes: ["video/mp4"],
        }),
        Id(),
        Paragraph(),
      ]}
    />
  );
};
