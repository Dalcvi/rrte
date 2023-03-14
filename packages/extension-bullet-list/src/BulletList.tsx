import { BulletList as TiptapBulletList } from '@tiptap/extension-bullet-list';
import { EditorExtension } from '@rrte/common-types';

export const BulletList: EditorExtension<typeof TiptapBulletList> = () => {
    const defaultConfig = {
        extension: TiptapBulletList
    };

    return {
        ...defaultConfig,
        extend(config: Parameters<typeof TiptapBulletList['extend']>) {
            return {
                extension: TiptapBulletList.extend(config)
            }
        },
    }
}