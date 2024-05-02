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
import { Video } from '@rrte/video';
import { Underline } from '@rrte/underline';
import { Gif } from '@rrte/gif';
import { Strike } from '@rrte/strike';
import { Image as ImageExtension } from '@rrte/image';
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
import { Id } from '@rrte/id';
import { Youtube } from '@rrte/youtube';
import { TextAlign } from '@rrte/text-align';
import { Paragraph } from '@rrte/paragraph';
import { Table, TableCell, TableHeader, TableRow } from '@rrte/table';
import { Placeholder } from '@rrte/placeholder';
import { Voice } from '@rrte/voice';
import { TableOfContents } from '@rrte/table-of-contents';

export const getConfig = () => {
  return [
    Blockquote(),
    Bold(),
    Color(),
    FontSize(),
    Id(),
    Voice(),
    Table(),
    TableCell(),
    TableHeader(),
    TableOfContents(),
    TableRow(),
    Placeholder(),
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
        const finalFile = new Promise(resolve =>
          setTimeout(resolve, 1000, {
            src: 'https://picsum.photos/200/300',
            originalHeight: 300,
            originalWidth: 200,
          })
        );

        return { tempFile, finalFile };
      },
      onPaste: async (file, imgAttr) => new Promise(resolve => setTimeout(resolve, 1000, imgAttr)),
    }),
    Video({
      type: 'user-controlled',
      onVideoAddClick: async () => {
        const tempFile = {
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
        new Promise(resolve => setTimeout(resolve, 1000, videoAttr)),
      maxFileSize: 100000000,
      acceptedVideoFileTypes: ['video/mp4', 'video/quicktime'],
    }),
    Youtube(),
  ];
};
