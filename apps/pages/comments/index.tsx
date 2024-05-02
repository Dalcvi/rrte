import { Blockquote } from '@rrte/blockquote';
import { Bold } from '@rrte/bold';
import { BulletList } from '@rrte/bullet-list';
import { Code } from '@rrte/code';
import { CodeBlock } from '@rrte/code-block';
import { Color } from '@rrte/color';
import { JSONContent } from '@rrte/common';
import { Dropcursor } from '@rrte/dropcursor';
import { Editor, EditorRef } from '@rrte/editor';
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
import { Strike } from '@rrte/strike';
import { Subscript } from '@rrte/subscript';
import { Superscript } from '@rrte/superscript';
import { TextAlign } from '@rrte/text-align';
import { TextStyle } from '@rrte/text-style';
import { Underline } from '@rrte/underline';
import { Video, VideoAttributes } from '@rrte/video';
import { Youtube } from '@rrte/youtube';
import { useRef, useState } from 'react';
import { Header } from '../../components/header';
import classes from './styles.module.css';

export default function Web() {
  const [content, setContent] = useState<JSONContent | undefined>(undefined);
  const [comments, setComments] = useState<JSONContent[]>([]);
  const editor = useRef<EditorRef>(null);

  return (
    <div>
      <Header />
      <div className={classes.commentsContainer}>
        <div>
          <div>
            <Editor
              content={content}
              onUpdateJson={content => {
                setContent(content);
              }}
              editorRef={editor}
              editorExtensions={[
                Paragraph(),
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
                }),
                Youtube(),
              ]}
              editorWrapperClassName={classes.editor}
              contentClassName={classes.editorContent}
              contentWrapperClassName={classes.editorContentWrapper}
            />
          </div>
          <div className={classes.submitWrapper}>
            <button
              aria-label="submit"
              className={classes.submit}
              disabled={editor.current?.isEmpty}
              onClick={() => {
                if (editor.current && content) {
                  setComments(comments => [content, ...comments]);
                  editor.current.commands.clearContent(true);
                }
              }}
            >
              SUBMIT
            </button>
          </div>
        </div>
        <div className={classes.line} />
        <div className={classes.commentList}>
          {comments.map((comments, i) => {
            return (
              <div key={i} className={classes.comment}>
                <div>
                  <div className={classes.commentHeader}>
                    <div className={classes.commentAvatar} />
                    <div className={classes.commentAuthor}>Author</div>
                  </div>
                </div>
                <Editor
                  content={comments}
                  viewerMode={true}
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
                    TextAlign(),
                    Paragraph(),
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
                    }),
                    Video({
                      type: 'user-controlled',
                      onVideoAddClick: async () => {
                        const tempFile = {
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
                        new Promise<VideoAttributes>(resolve =>
                          setTimeout(resolve, 1000, videoAttr)
                        ),
                      maxFileSize: 100000000,
                      acceptedVideoFileTypes: ['video/mp4', 'video/quicktime'],
                    }),
                    Youtube(),
                  ]}
                  editorWrapperClassName={classes.editor}
                  contentClassName={classes.viewerContent}
                  contentWrapperClassName={classes.editorWrapper}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
