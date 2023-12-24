import { JSONContent } from '@rrte/common';
import { Editor, EditorRef } from '@rrte/editor';
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
        <div className={classes.commentBoxContainer}>
          <div className={classes.commentBox}>
            <Editor
              content={content}
              onUpdateJson={content => {
                setContent(content);
              }}
              editorRef={editor}
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
                  setComments(comments => [...comments, content]);
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
