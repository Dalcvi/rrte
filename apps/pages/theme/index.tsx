import { JSONContent } from '@rrte/common';
import { Editor } from '@rrte/editor';
import { Blockquote } from '@rrte/extension-blockquote';
import { Bold } from '@rrte/extension-bold';
import { BulletList } from '@rrte/extension-bullet-list';
import { Code } from '@rrte/extension-code';
import { CodeBlock } from '@rrte/extension-code-block';
import { Color } from '@rrte/extension-color';
import { Dropcursor } from '@rrte/extension-dropcursor';
import { FontSize } from '@rrte/extension-font-size';
import { Gapcursor } from '@rrte/extension-gapcursor';
import { Gif } from '@rrte/extension-gif';
import { HardBreak } from '@rrte/extension-hard-break';
import { Heading } from '@rrte/extension-heading';
import { Highlight } from '@rrte/extension-highlight';
import { History } from '@rrte/extension-history';
import { Id } from '@rrte/extension-id';
import { ImageAttributes, Image as ImageExtension } from '@rrte/extension-image';
import { Italic } from '@rrte/extension-italic';
import { Link } from '@rrte/extension-link';
import { ListItem } from '@rrte/extension-list-item';
import { OrderedList } from '@rrte/extension-ordered-list';
import { Paragraph } from '@rrte/extension-paragraph';
import { Strike } from '@rrte/extension-strike';
import { Subscript } from '@rrte/extension-subscript';
import { Superscript } from '@rrte/extension-superscript';
import { TextAlign } from '@rrte/extension-text-align';
import { TextStyle } from '@rrte/extension-text-style';
import { Underline } from '@rrte/extension-underline';
import { Video, VideoAttributes } from '@rrte/extension-video';
import { Youtube } from '@rrte/extension-youtube';
import { useEffect, useState } from 'react';
import { Header } from '../../components/header';
import classes from './styles.module.css';

export default function Web() {
  const [content, setContent] = useState<JSONContent | undefined>(undefined);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setContent(JSON.parse(window.localStorage.getItem('rrte-content-theme') ?? '{}'));
    }
  }, []);

  return (
    <div>
      <Header />
      <div className={classes.siteContainer}>
        <Editor
          content={content}
          onUpdateJson={content => {
            if (typeof window !== 'undefined') {
              window.localStorage.setItem('rrte-content-theme', JSON.stringify(content));
            }
            setContent(content);
          }}
          extensions={[
            Blockquote(),
            Bold(),
            Color(),
            FontSize(),
            Id(),
            BulletList().extendConfig(conf => ({
              ...conf,
              toolbar: conf.toolbar
                ? {
                    ...conf.toolbar,
                    priority: 100000000000,
                  }
                : undefined,
            })),
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
            TextAlign(),
            Paragraph(),
            Highlight(),
            History(),
            Gapcursor(),
            Gif('U2cUFPs3FgG3vLbp2DLXKRlUXn2N12bO'),
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
          contentClassName={classes.content}
          contentWrapperClassName={classes.editorContentWrapper}
        />
      </div>
    </div>
  );
}
