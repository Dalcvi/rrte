import { BulletList as TiptapBulletList } from '@tiptap/extension-bullet-list';
export const Bold = () => {
    const defaultConfig = {
        extension: TiptapBulletList
    };
    return Object.assign(Object.assign({}, defaultConfig), { extend(config) {
            return {
                extension: TiptapBulletList.extend(config)
            };
        } });
};
