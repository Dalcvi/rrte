import { Blockquote } from "@rrte/extension-blockquote";
import { BulletList } from "@rrte/extension-bullet-list";
import { CodeBlock } from "@rrte/extension-code-block";
import { HardBreak } from "@rrte/extension-hard-break";
import { Heading } from "@rrte/extension-heading";
import { ListItem } from "@rrte/extension-list-item";
import { OrderedList } from "@rrte/extension-ordered-list";
import { Bold } from "@rrte/extension-bold";
import { Italic } from "@rrte/extension-italic";
import { Link } from "@rrte/extension-link";
import { Video } from "@rrte/extension-video";
import { Underline } from "@rrte/extension-underline";
import { Gif } from "@rrte/extension-gif";
import { Strike } from "@rrte/extension-strike";
import { Image as ImageExtension } from "@rrte/extension-image";
import { Code } from "@rrte/extension-code";
import { Subscript } from "@rrte/extension-subscript";
import { Superscript } from "@rrte/extension-superscript";
import { TextStyle } from "@rrte/extension-text-style";
import { Highlight } from "@rrte/extension-highlight";
import { History } from "@rrte/extension-history";
import { Gapcursor } from "@rrte/extension-gapcursor";
import { Dropcursor } from "@rrte/extension-dropcursor";
import { Color } from "@rrte/extension-color";
import { FontSize } from "@rrte/extension-font-size";
import { Id } from "@rrte/extension-id";
import { Youtube } from "@rrte/extension-youtube";
import { TextAlign } from "@rrte/extension-text-align";
import { Paragraph } from "@rrte/extension-paragraph";

export const getConfig = () => {
  return [
    Blockquote(),
    Bold(),
    Color(),
    FontSize(),
    Id(),
    BulletList(),
    CodeBlock(),
    HardBreak(),
    Heading(),
    ListItem(),
    OrderedList(),
    Italic(),
    Link(),
    Underline(),
    Strike(),
    Code(),
    Subscript(),
    Superscript(),
    TextStyle(),
    Highlight(),
    TextAlign(),
    Paragraph(),
    History(),
    Gapcursor(),
    Gif("U2cUFPs3FgG3vLbp2DLXKRlUXn2N12bO"),
    Dropcursor(),
    ImageExtension({
      type: "user-controlled",
      maxFileSize: 100000000,
      acceptedImageFileTypes: ["image/jpeg", "image/png"],
      onImageAddClick: async () => {
        const tempFile = {
          src: "https://picsum.photos/300/200",
          originalHeight: 200,
          originalWidth: 300,
        };
        const finalFile = new Promise((resolve) =>
          setTimeout(resolve, 1000, {
            src: "https://picsum.photos/200/300",
            originalHeight: 300,
            originalWidth: 200,
          })
        );

        return { tempFile, finalFile };
      },
      onPaste: async (file, imgAttr) =>
        new Promise((resolve) => setTimeout(resolve, 1000, imgAttr)),
    }),
    Video({
      type: "user-controlled",
      onVideoAddClick: async () => {
        const tempFile = {
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
        new Promise((resolve) => setTimeout(resolve, 1000, videoAttr)),
      maxFileSize: 100000000,
      acceptedVideoFileTypes: ["video/mp4", "video/quicktime"],
    }),
    Youtube(),
  ];
};
