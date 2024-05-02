import { SpeechCommand } from '@rrte/common';
import { SupportedLanguages, Translate } from '@rrte/i18n';
import { Editor } from '@tiptap/core';
import levenshtein from 'fast-levenshtein';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createWordsToChange, createWordsToReplaceRegex } from './words-to-replace-regex';
import {} from '@rrte/text';

const Modes = {
  OFF: 'off',
  COMMAND: 'command',
  DICTATION: 'dictation',
} as const;

const SpeechRecognition =
  typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : undefined;

type SpeechMachineStateOff = {
  mode: typeof Modes.OFF;
};

type SpeechCommandWithDistance = SpeechCommand & {
  distance: number;
};

type SpeechMachineStateCommand = {
  mode: typeof Modes.COMMAND;
  speechRecognition: SpeechRecognition;
  isStopped: boolean;
  previousState: typeof Modes.DICTATION | typeof Modes.OFF;
  lastTriedCommandsWithDistance: SpeechCommandWithDistance[] | null;
  lastTriedCommand: string | null;
};

type SpeechMachineStateDictation = {
  mode: typeof Modes.DICTATION;
  speechRecognition: SpeechRecognition;
  currentRange: { from: number; to: number } | null;
  isStopped: boolean;
  previousState: typeof Modes.COMMAND | typeof Modes.OFF;
};

type EnterDictationModeCommand = {
  activationKeyword: string;
  command: (previousState: typeof Modes.COMMAND | typeof Modes.OFF) => void;
  description: string;
};

type SpeechMachineState =
  | SpeechMachineStateOff
  | SpeechMachineStateCommand
  | SpeechMachineStateDictation;

export const useSpeechStateMachine = (
  editor: Editor,
  t: Translate,
  language: SupportedLanguages
) => {
  const { updateMode, state } = useMode();

  useEffect(() => {
    return () => {
      switch (state.current.mode) {
        case Modes.DICTATION:
          tearDownDictationMode();
          turnOffMode();
          break;
        case Modes.COMMAND:
          tearDownCommandMode();
          turnOffMode();
          break;
        default:
          break;
      }
    };
  }, [language, t]);

  const { commands, enterDictationMode } = useMemo(() => {
    const editorCommands = editor.extensionManager.extensions
      .map(({ config }) => {
        return config.speechCommands?.(t) ?? [];
      })
      .flat()
      .sort((a, b) => b.activationKeyword.length - a.activationKeyword.length) as SpeechCommand[];

    const enterDictationMode: EnterDictationModeCommand = {
      activationKeyword: t('begin-dictation-mode'),
      command: previousStateMode => {
        tearDownCommandMode();

        switch (previousStateMode) {
          case Modes.COMMAND:
            turnOnDictationMode();
            break;
          case Modes.OFF:
            turnOffMode();
            break;
          default:
            turnOffMode();
            break;
        }
      },
      description: 'Exit voice mode',
    };

    return { commands: editorCommands, enterDictationMode };
  }, [language, t]);

  // ----------------- STATE MANAGEMENT -----------------

  /**
   * ----------------- OFF MODE -----------------
   */

  const turnOffMode = useCallback(() => {
    if (state.current.mode === Modes.DICTATION) {
      tearDownDictationMode();
    }

    if (state.current.mode === Modes.COMMAND) {
      tearDownCommandMode();
    }

    updateMode({
      mode: Modes.OFF,
    });
  }, []);

  /**
   * ----------------- DICTATION MODE -----------------
   */

  const turnOnDictationMode = useCallback(() => {
    const currentState = state.current;

    if (currentState.mode === Modes.DICTATION || !SpeechRecognition) {
      return;
    }

    const speechRecognition = new SpeechRecognition();

    updateMode({
      mode: Modes.DICTATION,
      speechRecognition,
      currentRange: null,
      isStopped: false,
      previousState: currentState.mode,
    });

    speechRecognition.continuous = false;
    speechRecognition.interimResults = true;
    speechRecognition.lang = getLanguage(language);
    speechRecognition.onresult = onDictationResult;
    speechRecognition.onend = () => {
      const currentState = state.current;
      if (currentState.mode === Modes.DICTATION && !currentState.isStopped) {
        currentState.speechRecognition.start();
        currentState.currentRange = null;
      }
    };
    speechRecognition.start();
  }, [language, t]);

  const tearDownDictationMode = useCallback(() => {
    const currentState = state.current;

    if (currentState.mode !== Modes.DICTATION) {
      return;
    }
    currentState.isStopped = true;
    currentState.speechRecognition.stop();
    currentState.speechRecognition.onresult = null;
    currentState.speechRecognition.onend = null;
  }, [language, t]);

  /**
   * ----------------- COMMAND MODE -----------------
   */

  const turnOnCommandMode = useCallback(() => {
    if (state.current.mode === Modes.COMMAND || !SpeechRecognition) {
      return;
    }

    const speechRecognition = new SpeechRecognition();

    updateMode({
      mode: Modes.COMMAND,
      speechRecognition,
      isStopped: false,
      previousState: state.current.mode,
      lastTriedCommandsWithDistance: null,
      lastTriedCommand: null,
    });

    speechRecognition.continuous = false;
    speechRecognition.interimResults = false;
    speechRecognition.lang = getLanguage(language);
    speechRecognition.onresult = onCommandResult;
    speechRecognition.onend = () => {
      const currentState = state.current;
      if (currentState.mode === Modes.COMMAND && !currentState.isStopped) {
        currentState.speechRecognition.start();
      }
    };
    speechRecognition.start();
  }, [language, t]);

  const tearDownCommandMode = useCallback(() => {
    const currentState = state.current;

    if (currentState.mode !== Modes.COMMAND) {
      return;
    }

    currentState.isStopped = true;
    currentState.speechRecognition.stop();
    currentState.speechRecognition.onend = null;
    currentState.speechRecognition.onresult = null;
  }, [language, t]);

  // ----------------- HANDLERS -----------------

  const onDictationResult = useCallback(
    (event: SpeechRecognitionEvent) => {
      const currentState = state.current;

      if (currentState.mode !== Modes.DICTATION || currentState.isStopped) {
        return;
      }

      const { from, to } = currentState.currentRange ?? {};

      const longestInterpretedResult = event.results[0];
      if (!longestInterpretedResult) {
        return;
      }

      const wordsToChange = createWordsToChange(t);
      const wordsToReplaceRegex = createWordsToReplaceRegex(wordsToChange);

      const trimmedText = longestInterpretedResult[0].transcript
        .trim()
        .toLocaleLowerCase()
        .replace(wordsToReplaceRegex, match => {
          const lowerCaseMatch = match.toLowerCase() as keyof typeof wordsToChange;
          const foundWord = wordsToChange[lowerCaseMatch];

          return foundWord ?? match;
        });
      const exitDictationModeStartKeyword = t('exit-dictation-mode');
      const exitDictationRegexp = new RegExp(`\\s*${exitDictationModeStartKeyword}`, 'gi');
      const commandModeStarted = trimmedText.match(exitDictationRegexp) !== null;
      if (commandModeStarted) {
        tearDownDictationMode();
      }

      const isFinal = longestInterpretedResult.isFinal;
      const text = commandModeStarted ? trimmedText.replace(exitDictationRegexp, '') : trimmedText;

      const editorChain = editor
        .chain()
        .setMeta('preventDispatch', true)
        .focus()
        .setMeta('addToHistory', isFinal);

      const newFrom = from !== undefined ? from : editor.state.selection.$from.pos;

      if (from !== undefined && to !== undefined) {
        editorChain.replaceText(text, { from, to }).run();
      } else {
        editorChain.insertText(text).run();
      }

      currentState.currentRange = !isFinal
        ? {
            from: newFrom,
            to: newFrom + text.length,
          }
        : null;

      if (commandModeStarted) {
        turnOnCommandMode();
      }
    },
    [language, t]
  );

  const onCommandResult = useCallback(
    (event: SpeechRecognitionEvent) => {
      const currentState = state.current;

      if (currentState.mode !== Modes.COMMAND || currentState.isStopped) {
        return;
      }

      const result = event.results[0];
      if (!result) {
        return;
      }

      const text = result[0].transcript.toLocaleLowerCase();

      currentState.lastTriedCommand = text;

      if (
        levenshtein.get(enterDictationMode.activationKeyword, text, {
          useCollator: true,
        }) < 3
      ) {
        return enterDictationMode.command(currentState.mode);
      }

      const commandFromText = commands.find(({ activationKeyword }) => text === activationKeyword);
      const commandsWithDistance = commandFromText
        ? []
        : commands.filter(filterAvailableCommand).map(currentCommand => {
            return {
              ...currentCommand,
              distance: levenshtein.get(currentCommand.activationKeyword, text, {
                useCollator: true,
              }),
            };
          });
      const editorCommand: SpeechCommand | undefined = commandFromText
        ? commandFromText
        : commandsWithDistance
            .filter(({ distance }) => distance < 3)
            .sort((a, b) => a.distance - b.distance)[0];

      if (editorCommand) {
        handleSpeechCommand(editorCommand);
      }

      if (!editorCommand && !currentState.isStopped) {
        currentState.lastTriedCommandsWithDistance = commandsWithDistance;
        updateMode(currentState);
      } else {
        currentState.lastTriedCommandsWithDistance = null;
      }
    },
    [language, t]
  );

  const handleSpeechCommand = useCallback(
    (speechCommand: SpeechCommand) => {
      if (speechCommand.command in editor.commands) {
        const { command, params } = speechCommand;
        if (params) {
          // @ts-ignore
          editor.chain().focus()[command].apply(editor.commands, params).run();
        } else {
          // @ts-ignore
          editor.chain().focus()[command]().run();
        }
      }
    },
    [language, t]
  );

  const getCurrentMode = useCallback(() => {
    return state.current.mode;
  }, []);

  const filterAvailableCommand = useCallback(
    ({ command, params }: SpeechCommand) => {
      const can = editor.can();

      if (!can[command]) {
        return false;
      }

      if (params) {
        // @ts-ignore
        return can[command].apply(editor.commands, params);
      } else {
        // @ts-ignore
        return can[command]();
      }
    },
    [language, t]
  );

  const groupCommands = useCallback(
    (commands: SpeechCommand[]) => {
      return commands.reduce(
        (acc, command) => {
          const group = command.group;
          if (!acc[group]) {
            acc[group] = [];
          }

          acc[group].push(command);

          return acc;
        },
        {} as Record<string, SpeechCommand[]>
      );
    },
    [language, t]
  );

  const getCurrentSuggestedCommands = useCallback(() => {
    const currentState = state.current;

    if (currentState.mode !== Modes.COMMAND) {
      return null;
    }

    const { lastTriedCommandsWithDistance } = currentState;
    if (!lastTriedCommandsWithDistance) {
      return groupCommands(commands.filter(filterAvailableCommand));
    }

    const filteredCommandsWithDistance = lastTriedCommandsWithDistance.filter(
      ({ activationKeyword, distance, command, params }) => {
        const isInBounds = distance < Math.max(activationKeyword.length / 2, 5);
        if (!isInBounds) {
          return false;
        }
        const can = editor.can();

        if (!can[command]) {
          return false;
        }

        if (params) {
          // @ts-ignore
          return can[command].apply(editor.commands, params);
        } else {
          // @ts-ignore
          return can[command]();
        }
      }
    );

    return groupCommands(
      filteredCommandsWithDistance.length > 0
        ? filteredCommandsWithDistance
        : commands.filter(filterAvailableCommand)
    );
  }, [filterAvailableCommand, language]);

  const getLastTriendCommand = useCallback(() => {
    return state.current.mode === Modes.COMMAND ? state.current.lastTriedCommand : null;
  }, []);

  return {
    turnOnDictationMode,
    turnOnCommandMode,
    turnOffMode,
    getCurrentMode,
    getCurrentSuggestedCommands,
    getLastTriendCommand,
    handleSpeechCommand,
  };
};

type ModeReactiveState =
  | {
      mode: typeof Modes.OFF | typeof Modes.DICTATION;
    }
  | {
      mode: typeof Modes.COMMAND;
    };

const useMode = () => {
  const [_, setModeState] = useState<ModeReactiveState>({ mode: Modes.OFF });

  const state = useRef<SpeechMachineState>({
    mode: Modes.OFF,
  });

  const updateMode = useCallback(
    (newState: SpeechMachineState) => {
      state.current = newState;

      switch (newState.mode) {
        case Modes.OFF:
          setModeState({
            mode: Modes.OFF,
          });
          break;
        case Modes.COMMAND:
          setModeState({
            mode: Modes.COMMAND,
          });
          break;
        case Modes.DICTATION:
          setModeState({
            mode: Modes.DICTATION,
          });
          break;
        default:
          throw new Error('Unreachable code');
      }
    },
    [setModeState]
  );

  return { updateMode, state };
};

export const getLanguage = (language: SupportedLanguages) => {
  switch (language) {
    case 'lt':
      return 'lt-LT';
    case 'en':
      return 'en-US';
    default:
      return 'en-US';
  }
};
