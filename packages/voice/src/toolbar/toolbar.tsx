import { useEditorSlot, type RegularButtonConfig } from '@rrte/common';
import { useTranslations } from '@rrte/i18n';
import type {} from '@rrte/text';
import classNames from 'classnames';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { VoiceExtension } from '../extension';
import VoiceIcon from './voice.icon.svg';
import classes from './toolbar.module.scss';
import { useSpeechStateMachine } from './use-speech-state-machine';

const Button: RegularButtonConfig['Button'] = ({ editor, editorContainerRef, t }) => {
  const { language } = useTranslations();
  const { setIsUsingSlot } = useEditorSlot();
  const {
    turnOnDictationMode,
    turnOffMode,
    getCurrentMode,
    getCurrentSuggestedCommands,
    getLastTriendCommand,
    handleSpeechCommand,
  } = useSpeechStateMachine(editor, t, language);

  useEffect(() => {
    editor.on('destroy', turnOffMode);
  }, []);

  const currentMode = getCurrentMode();

  const getAriaLabel = () => {
    switch (currentMode) {
      case 'dictation':
        return t('voice-buttond-dictation-mode-on.text');
      case 'command':
        return t('voice-buttond-command-mode-on.text');
      default:
        return t('voice-button.text');
    }
  };

  useEffect(() => {
    if (currentMode === 'command') {
      setIsUsingSlot(true);
    } else {
      setIsUsingSlot(false);
    }
  }, [currentMode]);

  const suggestedCommands = currentMode === 'command' && getCurrentSuggestedCommands();

  return (
    <>
      <button
        aria-label={getAriaLabel()}
        data-testid="voice-button"
        className={classNames(classes.voiceButton, {
          [classes.dictation]: currentMode === 'dictation',
          [classes.command]: currentMode === 'command',
        })}
        onClick={() => {
          const currentMode = getCurrentMode();

          if (currentMode !== 'off') {
            return turnOffMode();
          }

          turnOnDictationMode();
        }}
      >
        {currentMode !== 'off' && <div className={classes.pulsatingCircle} />}
        <VoiceIcon
          height={'15px'}
          width={'15px'}
          className={classNames(classes.icon, {
            [classes.dictation]: currentMode === 'dictation',
            [classes.command]: currentMode === 'command',
          })}
        />
      </button>
      {currentMode === 'command' &&
        editorContainerRef &&
        ReactDOM.createPortal(
          <div>
            <div className={classes.commandContainer}>
              <h2 className={classes.title}>{t('commands.title')}</h2>
              {getLastTriendCommand() && (
                <div className={classes.lastTriedContainer}>
                  <span className={classes.lastTriedLabel}>{t('last-tried.label')}</span>
                  <p className={classes.lastTriedText} id="last-tried-command">
                    <strong>{getLastTriendCommand()}</strong>
                  </p>
                </div>
              )}
              {!!suggestedCommands && (
                <section aria-labelledby="suggested-commands">
                  <h3 id="suggested-commands" className={classes.suggestedCommands}>
                    {t('suggested-commands.title')}
                  </h3>
                  <ul role="tree" className={classes.suggestedCommandsContainer}>
                    {Object.keys(suggestedCommands).map(group => {
                      return (
                        <li key={group} className={classes.group}>
                          <span id={group} className={classes.groupTitle}>
                            {group}
                          </span>
                          <ul
                            role="group"
                            aria-labelledby={group}
                            className={classes.suggestedCommandsGroup}
                          >
                            {suggestedCommands[group]
                              .sort((a, b) => {
                                if (a.activationKeyword < b.activationKeyword) {
                                  return -1;
                                }
                                if (a.activationKeyword > b.activationKeyword) {
                                  return 1;
                                }
                                return 0;
                              })
                              .map(command => (
                                <li key={command.activationKeyword}>
                                  <button
                                    onClick={() => {
                                      handleSpeechCommand(command);
                                    }}
                                    className={classes.command}
                                  >
                                    {command.activationKeyword}
                                  </button>
                                </li>
                              ))}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )}
            </div>
          </div>,
          editorContainerRef
        )}
    </>
  );
};

export const ToolbarButton: RegularButtonConfig = {
  Button,
  name: VoiceExtension.name,
  text: 'voice-button.text',
  type: 'icon' as const,
  priority: 98,
};
