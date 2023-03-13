import type { AnyExtension } from '@tiptap/core';
import { MenuConfig } from './MenuConfig';

export type ExtensionExtend<T extends AnyExtension, K> = (config: Parameters<T['extend']>) => Omit<ReturnType<EditorExtension<T, K>>, 'extend'>

export type EditorExtension<T extends AnyExtension, K = void> = ((config: K) => {
   extension: T;
   rrteConfig: K;
   extend: ExtensionExtend<T, K>;
}) | (() => {
   extension: T;
   extend: ExtensionExtend<T, K>;
});
