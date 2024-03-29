import { Editor } from '@rrte/editor';
import { Blockquote } from '@rrte/blockquote';
import { BulletList } from '@rrte/bullet-list';
import { CodeBlock } from '@rrte/code-block';
import { HardBreak } from '@rrte/hard-break';
import { Heading } from '@rrte/heading';
import { ListItem } from '@rrte/list-item';
import { OrderedList } from '@rrte/ordered-list';
import { Bold } from '@rrte/bold';
import { Italic } from '@rrte/italic';
import { Link } from '@rrte/link';
import { Video, VideoAttributes } from '@rrte/video';
import { Underline } from '@rrte/underline';
import { Placeholder } from '@rrte/placeholder';
import { Gif } from '@rrte/gif';
import { Strike } from '@rrte/strike';
import { ImageAttributes, Image as ImageExtension } from '@rrte/image';
import { Code } from '@rrte/code';
import { Subscript } from '@rrte/subscript';
import { Superscript } from '@rrte/superscript';
import { TextStyle } from '@rrte/text-style';
import { Highlight } from '@rrte/highlight';
import { History } from '@rrte/history';
import { Gapcursor } from '@rrte/gapcursor';
import { Dropcursor } from '@rrte/dropcursor';
import { Color } from '@rrte/color';
import { FontSize } from '@rrte/font-size';
import { TextAlign } from '@rrte/text-align';
import { Paragraph } from '@rrte/paragraph';
import { Id } from '@rrte/id';
import { Youtube } from '@rrte/youtube';
import { HTMLContent, JSONContent } from '@rrte/common';
import classes from './styles.module.css';
import { useEffect, useState } from 'react';
import React from 'react';
import { Header } from '../components/header';
import Head from 'next/head';

export default function Web() {
  const [content, setContent] = useState<JSONContent | undefined>(undefined);
  const [, setHtmlContent] = useState<HTMLContent | undefined>(undefined);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setContent(JSON.parse(window.localStorage.getItem('rrte-content') ?? '{}'));
    }
  }, []);

  return (
    <div>
      <Head>
        <title>RRTE</title>
        <meta aria-label="description" content="React Rich Text Editor" />
      </Head>
      <Header />
      <div className={classes.siteContainer}>
        <Editor
          content={content}
          onUpdateJson={jsonContent => {
            if (typeof window !== 'undefined') {
              window.localStorage.setItem('rrte-content', JSON.stringify(jsonContent));
            }
            setContent(jsonContent);
          }}
          onUpdateHtml={htmlC => {
            setHtmlContent(htmlC);
            if (typeof window !== 'undefined') {
              window.localStorage.setItem('rrte-content-html', JSON.stringify(htmlC));
            }
          }}
          editorExtensions={[
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
            Gif('U2cUFPs3FgG3vLbp2DLXKRlUXn2N12bO'),
            Dropcursor(),
            TextAlign(),
            Placeholder({
              placeholderText: 'You can type whatever you want!',
            }),
            Paragraph(),
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
                const finalFile = new Promise<ImageAttributes>(resolve =>
                  setTimeout(resolve, 1000, {
                    src: 'https://picsum.photos/200/300',
                    originalHeight: 300,
                    originalWidth: 200,
                  })
                );

                return { tempFile, finalFile };
              },
              onPaste: async (file, imgAttr) =>
                new Promise<ImageAttributes>(resolve => setTimeout(resolve, 1000, imgAttr)),
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
                const finalFile = new Promise<VideoAttributes>(resolve =>
                  setTimeout(resolve, 1000, {
                    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
                  })
                );

                return { tempFile, finalFile };
              },
              onPaste: async (file, videoAttr) =>
                new Promise<VideoAttributes>(resolve => setTimeout(resolve, 1000, videoAttr)),
              maxFileSize: 100000000,
              acceptedVideoFileTypes: ['video/mp4', 'video/quicktime'],

              // type: 'extension-controlled',
              // onVideoAdd: async (file, videoAttr) => {
              //   return videoAttr;
              // },
              // maxFileSize: 100000000,
              // acceptedVideoFileTypes: ['video/mp4', 'video/quicktime'],
            }),
            Youtube(),
          ]}
          editorWrapperClassName={classes.editor}
          contentClassName={classes.editorContent}
          contentWrapperClassName={classes.editorContentWrapper}
        />
      </div>
    </div>
  );
}
