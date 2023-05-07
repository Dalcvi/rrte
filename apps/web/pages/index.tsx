import { Editor } from '@rrte/editor';
import { Blockquote } from '@rrte/extension-blockquote';
import { BulletList } from '@rrte/extension-bullet-list';
import { CodeBlock } from '@rrte/extension-code-block';
import { HardBreak } from '@rrte/extension-hard-break';
import { Heading } from '@rrte/extension-heading';
import { ListItem } from '@rrte/extension-list-item';
import { OrderedList } from '@rrte/extension-ordered-list';
import { Bold } from '@rrte/extension-bold';
import { Italic } from '@rrte/extension-italic';
import { Link } from '@rrte/extension-link';
import { Video, VideoAttributes } from '@rrte/extension-video';
import { Underline } from '@rrte/extension-underline';
import { Strike } from '@rrte/extension-strike';
import { ImageAttributes, Image as ImageExtension } from '@rrte/extension-image';
import { Code } from '@rrte/extension-code';
import { Subscript } from '@rrte/extension-subscript';
import { Superscript } from '@rrte/extension-superscript';
import { TextStyle } from '@rrte/extension-text-style';
import { Highlight } from '@rrte/extension-highlight';
import { History } from '@rrte/extension-history';
import { Gapcursor } from '@rrte/extension-gapcursor';
import { Dropcursor } from '@rrte/extension-dropcursor';
import { Color } from '@rrte/extension-color';
import { FontSize } from '@rrte/extension-font-size';
import { Id } from '@rrte/extension-id';
import { JSONContent } from '@rrte/common';
import classes from './styles.module.css';
import { useState } from 'react';
import React from 'react';

export default function Web() {
  const [content, setContent] = useState<JSONContent | undefined>(undefined);

  return (
    <div className={classes.siteContainer}>
      <Editor
        content={content}
        onUpdate={setContent}
        extensions={[
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
          History(),
          Gapcursor(),
          Dropcursor(),
          ImageExtension({
            type: 'user-controlled',
            maxFileSize: 100000000,
            acceptedImageFileTypes: ['image/jpeg', 'image/png'],
            onImageAddClick: async () => {
              const tempFile = {
                src: 'https://picsum.photos/300/200',
                originalHeight: 200,
                originalWidth: 300,
              };
              const finalFile = new Promise<ImageAttributes>((resolve) =>
                setTimeout(resolve, 1000, {
                  src: 'https://picsum.photos/200/300',
                  originalHeight: 300,
                  originalWidth: 200,
                }),
              );

              return { tempFile, finalFile };
            },
            onPaste: async (file, imgAttr) =>
              new Promise<ImageAttributes>((resolve) => setTimeout(resolve, 1000, imgAttr)),
            // type: 'extension-controlled',
            // maxFileSize: 100000000,
            // onImageAdd: async (file, imgAttr) => {
            //   return imgAttr;
            // },
            // acceptedImageFileTypes: ['image/jpeg', 'image/png'],
          }),
          Video({
            type: 'user-controlled',
            onVideoAddClick: async () => {
              const tempFile = {
                // src to a video
                src: 'https://www.w3schools.com/html/mov_bbb.mp4',
              };
              const finalFile = new Promise<VideoAttributes>((resolve) =>
                setTimeout(resolve, 1000, {
                  src: 'https://www.w3schools.com/html/mov_bbb.mp4',
                }),
              );

              return { tempFile, finalFile };
            },
            onPaste: async (file, videoAttr) =>
              new Promise<VideoAttributes>((resolve) => setTimeout(resolve, 1000, videoAttr)),
            maxFileSize: 100000000,
            acceptedVideoFileTypes: ['video/mp4', 'video/quicktime'],

            // type: 'extension-controlled',
            // onVideoAdd: async (file, videoAttr) => {
            //   return videoAttr;
            // },
            // maxFileSize: 100000000,
            // acceptedVideoFileTypes: ['video/mp4', 'video/quicktime'],
          }),
        ]}
        className={classes.editor}
        editorContentClassName={classes.editorContent}
      />
      {content && (
        <div className={classes.schemaContainer}>
          <pre>{JSON.stringify(content, null, 6)}</pre>
        </div>
      )}
    </div>
  );
}
