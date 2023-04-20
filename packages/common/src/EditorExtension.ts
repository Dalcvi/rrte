import type { Extension as TiptapExtension, Node as TiptapNode, Mark as TiptapMark } from '@tiptap/core';
export type {Extension as TiptapExtension, Node as TiptapNode, Mark as TiptapMark, AnyExtension as TiptapAnyExtension } from '@tiptap/core';

export type AllExtension<T, K> = TiptapExtension<T, K> | TiptapNode<T, K> | TiptapMark<T, K>;

export type UnknownExtension = Extension<AllExtension<unknown, unknown>, unknown, unknown, unknown>;

export type Extension<T extends AllExtension<TO, TS>, K, TO = any, TS = any> = {
   extension: T;
   config: K;
   extend: <O extends TO & Extend, S extends TS & Extend>(ext: Record<string, any>)=> Extension<AllExtension<O, S>, K, O, S>;
}

type Extend = {};

export const createExtension = <T extends AllExtension<TO, TS>, K, TO = any, TS = any>(extension: T, config: K): Extension<T, K, TO, TS> => {
   return {
      extension,
      config,
      extend: <O extends TO & Extend, S extends TS & Extend>(ext: Record<string, any>) => {
         const test = extension.extend<O, S>(ext);
         return createExtension<AllExtension<O, S>, K, O, S>(test, config);
      }
   }
}

