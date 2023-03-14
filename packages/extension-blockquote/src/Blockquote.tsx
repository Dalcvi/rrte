import { EditorExtension } from '@rrte/common-types';
import { Blockquote as TiptapBlockquote } from '@tiptap/extension-blockquote';

export const Blockquote: EditorExtension<typeof TiptapBlockquote> = () => {
    const defaultConfig = {
        extension: TiptapBlockquote
    };

    return {
        ...defaultConfig,
        extend(config: Parameters<typeof TiptapBlockquote['extend']>) {
            return {
                extension: TiptapBlockquote.extend(config)
            }
        },
    }
}