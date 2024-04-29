import { Translate } from '@rrte/i18n';
import { RawCommands } from '@tiptap/core';

type RawCommandKeys = keyof RawCommands;

export type SpeechCommand = {
  activationKeyword: string;
  command: RawCommandKeys;
  group: string;
  params?: Parameters<RawCommands[RawCommandKeys]>;
  description: string;
};

export type SpeechCommandsCreator = (t: Translate) => SpeechCommand[];

declare module '@tiptap/core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface NodeConfig<Options, Storage> {
    speechCommands?: SpeechCommandsCreator;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface MarkConfig<Options, Storage> {
    speechCommands?: SpeechCommandsCreator;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ExtensionConfig<Options, Storage> {
    speechCommands?: SpeechCommandsCreator;
  }
}
