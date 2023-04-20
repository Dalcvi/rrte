import { EditorExtension } from '@rrte/common';
import { Bold as TiptapBold } from '@tiptap/extension-bold';

export const Bold: EditorExtension<typeof TiptapBold> = () => {
    const defaultConfig = {
        extension: TiptapBold
    };

    return {
        ...defaultConfig,
        extend(config: Parameters<typeof TiptapBold['extend']>) {
            return {
                extension: TiptapBold.extend(config)
            }
        },
    }
}