import type { Extension as TiptapExtension, Node as TiptapNode, Mark as TiptapMark } from '@tiptap/core';
import { Config } from './config';
import { cloneDeep } from 'lodash';
export type {
  Extension as TiptapExtension,
  Node as TiptapNode,
  Mark as TiptapMark,
  AnyExtension as TiptapAnyExtension,
} from '@tiptap/core';

export type AllExtension<T, K> = TiptapExtension<T, K> | TiptapNode<T, K> | TiptapMark<T, K>;

export type UnknownExtension = Extension<AllExtension<any, any>, any, any>;

export type Extension<T extends AllExtension<TO, TS>, TO = any, TS = any> = {
  extension: T;
  config: Partial<Config>;
  extend: <O extends TO & Extend, S extends TS & Extend>(
    ext: Record<string, any>,
  ) => Extension<AllExtension<O, S>, O, S>;
  extendConfig: (getConfig: (config: Partial<Config>) => Partial<Config>) => Extension<AllExtension<TO, TS>, TO, TS>;
};

type Extend = {};

export const createExtension = <T extends AllExtension<TO, TS>, TO = any, TS = any>(
  extension: T,
  config: Partial<Config>,
): Extension<T, TO, TS> => {
  return {
    extension,
    config,
    extend: <O extends TO & Extend, S extends TS & Extend>(ext: Record<string, any>) => {
      return createExtension<AllExtension<O, S>, O, S>(extension.extend<O, S>(ext), config);
    },
    extendConfig: (getConfig: (config: Partial<Config>) => Partial<Config>) => {
      return createExtension<AllExtension<TO, TS>, TO, TS>(extension, getConfig(cloneDeep(config)));
    },
  };
};
