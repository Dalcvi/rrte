import { Editor } from "@rrte/editor";
import { Paragraph } from "@rrte/extension-paragraph";
import { Image } from "@rrte/extension-image";
import { Id } from "@rrte/extension-id";
import React from "react";
import classes from "./styles.module.css";

export const UserControlledImage = () => {
  return (
    <Editor
      content={undefined}
      contentWrapperClassName={classes.contentWrapper}
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
            const finalFile = new Promise((resolve) => {
              setTimeout(resolve, 1000, {
                src: "https://picsum.photos/200/300",
                originalHeight: 300,
                originalWidth: 200,
              });
            });

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
};

export const ExtensionControlledImage = () => {
  return (
    <Editor
      content={undefined}
      contentWrapperClassName={classes.contentWrapper}
      extensions={[
        Image({
          type: "extension-controlled",
          maxFileSize: 100000000,
          onImageAdd: async (file, imgAttr) => {
            return imgAttr;
          },
          acceptedImageFileTypes: ["image/jpeg", "image/png"],
        }),
        Id(),
        Paragraph(),
      ]}
    />
  );
};
