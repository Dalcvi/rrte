import { Blockquote } from '@rrte/blockquote';
import { Bold } from '@rrte/bold';
import { BulletList } from '@rrte/bullet-list';
import { Code } from '@rrte/code';
import { CodeBlock } from '@rrte/code-block';
import { Color } from '@rrte/color';
import { HTMLContent, JSONContent } from '@rrte/common';
import { Dropcursor } from '@rrte/dropcursor';
import { Editor } from '@rrte/editor';
import { FontSize } from '@rrte/font-size';
import { Gapcursor } from '@rrte/gapcursor';
import { Gif } from '@rrte/gif';
import { HardBreak } from '@rrte/hard-break';
import { Heading } from '@rrte/heading';
import { Highlight } from '@rrte/highlight';
import { History } from '@rrte/history';
import { Id } from '@rrte/id';
import { ImageAttributes, Image as ImageExtension } from '@rrte/image';
import { Italic } from '@rrte/italic';
import { Link } from '@rrte/link';
import { ListItem } from '@rrte/list-item';
import { OrderedList } from '@rrte/ordered-list';
import { Paragraph } from '@rrte/paragraph';
import { Placeholder } from '@rrte/placeholder';
import { Strike } from '@rrte/strike';
import { Subscript } from '@rrte/subscript';
import { Superscript } from '@rrte/superscript';
import { Table, TableCell, TableHeader, TableRow } from '@rrte/table';
import { TableOfContents } from '@rrte/table-of-contents';
import { TextAlign } from '@rrte/text-align';
import { TextStyle } from '@rrte/text-style';
import { Underline } from '@rrte/underline';
import { Video, VideoAttributes } from '@rrte/video';
import { Voice } from '@rrte/voice';
import { Youtube } from '@rrte/youtube';
import { useEffect, useState } from 'react';
import { Header } from '../../components/header';
import classes from './styles.module.css';

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
      <Header />
      <div className={classes.siteContainer}>
        <Editor
          content={content}
          onUpdateJson={content => {
            if (typeof window !== 'undefined') {
              window.localStorage.setItem('rrte-content', JSON.stringify(content));
            }
            setContent(content);
          }}
          onUpdateHtml={content => {
            setHtmlContent(content);
            if (typeof window !== 'undefined') {
              window.localStorage.setItem('rrte-content-html', JSON.stringify(content));
            }
          }}
          editorExtensions={[
            Placeholder({
              placeholderText: 'Write something...',
            }),
            Table(),
            TableCell(),
            TableHeader(),
            TableRow(),
            TableOfContents(),
            Blockquote(),
            Voice(),
            Color(),
            FontSize(),
            Id(),
            Bold(),
            BulletList(),
            CodeBlock(),
            HardBreak(),
            Heading(),
            TextAlign(),
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
          contentClassName={classes.editorContent}
          contentWrapperClassName={classes.editorContentWrapper}
        />
        {content && (
          <div className={classes.schemaContainer}>
            <pre>{JSON.stringify(content, null, 6)}</pre>
            {/* {htmlContent && <div dangerouslySetInnerHTML={{ __html: htmlContent }} />} */}
          </div>
        )}
      </div>
    </div>
  );
}
