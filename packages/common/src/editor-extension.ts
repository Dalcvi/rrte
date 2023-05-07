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

export type UnknownExtension = Extension<Config<any>, AllExtension<any, any>, any, any>;

export type Extension<C extends Record<string, any>, T extends AllExtension<TO, TS>, TO = any, TS = any> = {
  extension: T;
  config: Config<C>;
  extend: <O extends TO & Extend, S extends TS & Extend>(
    ext: Record<string, any>,
  ) => Extension<C, AllExtension<O, S>, O, S>;
  extendConfig: <NC extends Record<string, any>>(
    getConfig: (config: Config<C>) => Config<NC>,
  ) => Extension<NC, AllExtension<TO, TS>, TO, TS>;
};

type Extend = {};

export const createExtension = <C extends Record<string, any>, T extends AllExtension<TO, TS>, TO = any, TS = any>(
  extension: T,
  config: Config<C>,
): Extension<C, T, TO, TS> => {
  return {
    extension,
    config,
    extend: <O extends TO & Extend, S extends TS & Extend>(ext: Record<string, any>) => {
      return createExtension<C, AllExtension<O, S>, O, S>(extension.extend<O, S>(ext), config);
    },
    extendConfig: <NC extends Record<string, any>>(getConfig: (config: Config<C>) => Config<NC>) => {
      return createExtension<NC, AllExtension<TO, TS>, TO, TS>(extension, getConfig(cloneDeep(config)));
    },
  };
};
