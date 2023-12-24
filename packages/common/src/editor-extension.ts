import type {
  Extension as TiptapExtension,
  Node as TiptapNode,
  Mark as TiptapMark,
} from '@tiptap/core';
import { Config } from './config';
import { cloneDeep } from 'lodash';
export type {
  Extension as TiptapExtension,
  Node as TiptapNode,
  Mark as TiptapMark,
  AnyExtension as TiptapAnyExtension,
} from '@tiptap/core';

export type AllExtension<ExtensionConfig, ExtensionType> =
  | TiptapExtension<ExtensionConfig, ExtensionType>
  | TiptapNode<ExtensionConfig, ExtensionType>
  | TiptapMark<ExtensionConfig, ExtensionType>;

export type UnknownExtension = Extension<Config<any>, AllExtension<any, any>, any, any>;

export type Extension<
  ConfigType extends Record<string, any>,
  TiptapExtensionType extends AllExtension<OriginalType, SubType>,
  OriginalType = any,
  SubType = any,
> = {
  extension: TiptapExtensionType;
  config: Config<ConfigType>;
  extend: <
    ExtendedOriginalType extends OriginalType & Extend,
    ExtendedSubType extends SubType & Extend,
  >(
    ext: Record<string, any>
  ) => Extension<
    ConfigType,
    AllExtension<ExtendedOriginalType, ExtendedSubType>,
    ExtendedOriginalType,
    ExtendedSubType
  >;
  extendConfig: <NewConfigType extends Record<string, any>>(
    getConfig: (config: Config<ConfigType>) => Config<NewConfigType>
  ) => Extension<NewConfigType, AllExtension<OriginalType, SubType>, OriginalType, SubType>;
};

type Extend = {};

export const createExtension = <
  ConfigType extends Record<string, any>,
  TiptapExtensionType extends AllExtension<OriginalType, SubType>,
  OriginalType = any,
  SubType = any,
>(
  extension: TiptapExtensionType,
  config: Config<ConfigType>
): Extension<ConfigType, TiptapExtensionType, OriginalType, SubType> => {
  return {
    extension,
    config,
    extend: <
      ExtendedOriginalType extends OriginalType & Extend,
      ExtendedSubType extends SubType & Extend,
    >(
      ext: Record<string, any>
    ) => {
      return createExtension<
        ConfigType,
        AllExtension<ExtendedOriginalType, ExtendedSubType>,
        ExtendedOriginalType,
        ExtendedSubType
      >(extension.extend<ExtendedOriginalType, ExtendedSubType>(ext), config);
    },
    extendConfig: <NewConfigType extends Record<string, any>>(
      getConfig: (config: Config<ConfigType>) => Config<NewConfigType>
    ) => {
      return createExtension<
        NewConfigType,
        AllExtension<OriginalType, SubType>,
        OriginalType,
        SubType
      >(extension, getConfig(cloneDeep(config)));
    },
  };
};
