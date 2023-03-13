import { Editor } from "@rrte/editor";
import { Blockquote } from "@rrte/extension-blockquote";
import { BulletList } from "@rrte/extension-bullet-list";
import { CodeBlock } from "@rrte/extension-code-block";
import { HardBreak } from "@rrte/extension-hard-break";
import { Heading } from "@rrte/extension-heading";
import { HorizontalRule } from "@rrte/extension-horizontal-rule";
import { ListItem } from "@rrte/extension-list-item";
import { OrderedList } from "@rrte/extension-ordered-list";
import { Bold} from '@rrte/extension-bold';
import { Italic } from '@rrte/extension-italic';
import { Link } from '@rrte/extension-link';
import { Underline } from '@rrte/extension-underline';
import { Strike } from '@rrte/extension-strike';
import { Code } from '@rrte/extension-code';
import { Subscript } from '@rrte/extension-subscript';
import { Superscript } from '@rrte/extension-superscript';
import { TextStyle } from '@rrte/extension-text-style';
import { Highlight } from '@rrte/extension-highlight';
import { History } from '@rrte/extension-history';
import { Gapcursor } from '@rrte/extension-gapcursor';
import { Dropcursor } from '@rrte/extension-dropcursor';


export default function Web() {
  return (
    <div>
      <Editor extensions={[
        Blockquote(),
        // BulletList,
        // CodeBlock,
        // HardBreak,
        // Heading,
        // HorizontalRule,
        // ListItem,
        // OrderedList,
        // Bold,
        // Italic,
        // Link,
        // Underline,
        // Strike,
        // Code,
        // Subscript,
        // Superscript,
        // TextStyle,
        // Highlight,
        // History,
        // Gapcursor,
        // Dropcursor,
      ]} />
    </div>
  );
}
