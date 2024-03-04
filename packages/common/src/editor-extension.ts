import type {
  ExtensionConfig,
  MarkConfig,
  NodeConfig,
  Mark as TiptapMark,
  Node as TiptapNode,
  Extension as TiptapExtension,
} from '@tiptap/core';
import { Config } from './config';
export type {
  Extension as TiptapExtension,
  Mark as TiptapMark,
  Node as TiptapNode,
} from '@tiptap/core';

export type UnknownExtension = Node<any> | Mark<any> | Extension<any>;

export type Node<ConfigType extends object, Options = any, Storage = any> = {
  node: TiptapNode<Options, Storage>;
  config: Config<ConfigType>;
  extend: <ExtendedOptions extends Options, ExtendedStorage extends Storage>({
    nodeExtension,
    createConfigExtension,
  }: {
    nodeExtension?: Partial<NodeConfig<ExtendedOptions, ExtendedStorage>>;
    createConfigExtension?: (previousConfig: Config<ConfigType>) => Config<ConfigType>;
  }) => Node<ConfigType, ExtendedOptions, ExtendedStorage>;
};

export const createNode = <ConfigType extends object, Options = any, Storage = any>(
  node: TiptapNode<Options, Storage>,
  config: Config<ConfigType>
): Node<ConfigType, Options, Storage> => {
  return {
    node,
    config,
    extend: <ExtendedOptions extends Options, ExtendedStorage extends Storage>({
      nodeExtension,
      createConfigExtension,
    }: {
      nodeExtension?: Partial<NodeConfig<ExtendedOptions, ExtendedStorage>>;
      createConfigExtension?: (previousConfig: Config<ConfigType>) => Config<ConfigType>;
    }) => {
      return createNode<ConfigType, ExtendedOptions, ExtendedStorage>(
        node.extend<ExtendedOptions, ExtendedStorage>(nodeExtension),
        {
          ...config,
          ...createConfigExtension,
        }
      );
    },
  };
};

export type Mark<ConfigType extends object, Options = any, Storage = any> = {
  mark: TiptapMark<Options, Storage>;
  config: Config<ConfigType>;
  extend: <ExtendedOptions extends Options, ExtendedStorage extends Storage>({
    markExtension,
    createConfigExtension,
  }: {
    markExtension?: Partial<MarkConfig<ExtendedOptions, ExtendedStorage>>;
    createConfigExtension?: (previousConfig: Config<ConfigType>) => Config<ConfigType>;
  }) => Mark<ConfigType, ExtendedOptions, ExtendedStorage>;
};

export const createMark = <ConfigType extends object, Options = any, Storage = any>(
  mark: TiptapMark<Options, Storage>,
  config: Config<ConfigType>
): Mark<ConfigType, Options, Storage> => {
  return {
    mark,
    config,
    extend: <ExtendedOptions extends Options, ExtendedStorage extends Storage>({
      markExtension,
      createConfigExtension,
    }: {
      markExtension?: Partial<MarkConfig<ExtendedOptions, ExtendedStorage>>;
      createConfigExtension?: (previousConfig: Config<ConfigType>) => Config<ConfigType>;
    }) => {
      return createMark<ConfigType, ExtendedOptions, ExtendedStorage>(
        mark.extend<ExtendedOptions, ExtendedStorage>(markExtension),
        {
          ...config,
          ...createConfigExtension,
        }
      );
    },
  };
};

export type Extension<ConfigType extends object, Options = any, Storage = any> = {
  extension: TiptapExtension<Options, Storage>;
  config: Config<ConfigType>;
  extend: <ExtendedOptions extends Options, ExtendedStorage extends Storage>({
    extension,
    createConfigExtension,
  }: {
    extension?: Partial<ExtensionConfig<ExtendedOptions, ExtendedStorage>>;
    createConfigExtension?: (previousConfig: Config<ConfigType>) => Config<ConfigType>;
  }) => Extension<ConfigType, ExtendedOptions, ExtendedStorage>;
};

export const createExtension = <ConfigType extends object, Options = any, Storage = any>(
  extension: TiptapExtension<Options, Storage>,
  config: Config<ConfigType>
): Extension<ConfigType, Options, Storage> => {
  return {
    extension,
    config,
    extend: <ExtendedOptions extends Options, ExtendedStorage extends Storage>({
      extension: nodeExtension,
      createConfigExtension,
    }: {
      extension?: Partial<ExtensionConfig<ExtendedOptions, ExtendedStorage>>;
      createConfigExtension?: (previousConfig: Config<ConfigType>) => Config<ConfigType>;
    }) => {
      return createExtension<ConfigType, ExtendedOptions, ExtendedStorage>(
        extension.extend<ExtendedOptions, ExtendedStorage>(nodeExtension),
        {
          ...config,
          ...createConfigExtension,
        }
      );
    },
  };
};
