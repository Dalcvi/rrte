import { createExtension } from '@rrte/common';
import { VoiceExtension } from './extension';
import { ToolbarButton } from './toolbar';

export const Voice = () =>
  createExtension(VoiceExtension, {
    toolbar: ToolbarButton,
    translations: {
      en: {
        'voice-button.text': 'Voice',
        'voice-buttond-dictation-mode-on.text': 'Voice dictation mode on',
        'voice-buttond-command-mode-on.text': 'Voice command mode on',
        'commands.title': 'Commands',
        'suggested-commands.title': 'Suggested commands:',
        'last-tried.label': 'Last tried:',
        'begin-dictation-mode': 'begin dictation mode',
        'exit-dictation-mode': 'exit dictation mode',
        'minimize-commands': 'minimize commands',
        'voice-group.text-formatting': 'Text formatting',
        'voice-group.text-navigation': 'Text navigation',
        'voice-group.table': 'Table',
        'voice-group.document-formatting': 'Document formatting',
        'voice-group.history': 'History',
        'voice-group.text-alignment': 'Text alignment',
        'voice-dictation.period': 'period',
        'voice-dictation-space.period': ' period',
        'voice-dictation.comma': 'comma',
        'voice-dictation-space.comma': ' comma',
        'voice-dictation.colon': 'colon',
        'voice-dictation-space.colon': ' colon',
        'voice-dictation.semi-colon': 'semi-colon',
        'voice-dictation-space.semi-colon': ' semi-colon',
        'voice-dictation.question-mark': 'question mark',
        'voice-dictation-space.question-mark': ' question mark',
        'voice-dictation.exclamation-mark': 'exclamation mark',
        'voice-dictation-space.exclamation-mark': ' exclamation mark',
        'voice-dictation.open-parenthesis': 'open parenthesis',
        'voice-dictation.close-parenthesis': 'close parenthesis',
        'voice-dictation-space.close-parenthesis': ' close parenthesis',
        'voice-dictation.open-bracket': 'open bracket',
        'voice-dictation.close-bracket': 'close bracket',
        'voice-dictation-space.close-bracket': ' close bracket',
        'voice-dictation.open-brace': 'open brace',
        'voice-dictation.close-brace': 'close brace',
        'voice-dictation-space.close-brace': ' close brace',
        'voice-dictation.quote': 'quote',
        'voice-dictation.single-quote': 'single quote',
        'voice-dictation.apostrophe': 'apostrophe',
        'voice-dictation.backslash': 'backslash',
        'voice-dictation.forward-slash': 'forward slash',
        'voice-dictation.asterisk': 'asterisk',
        'voice-dictation.ampersand': 'ampersand',
        'voice-dictation.hashtag': 'hashtag',
        'voice-dictation.hashtag-space': ' hashtag',
        'accessibility.text': 'Accessibility',
      },
      lt: {
        'voice-button.text': 'Balsas',
        'voice-buttond-dictation-mode-on.text': 'Diktavimo balsu režimas įjungtas',
        'voice-buttond-command-mode-on.text': 'Balso komandų režimas įjungtas',
        'commands.title': 'Komandos',
        'suggested-commands.title': 'Siūlomos komandos:',
        'last-tried.label': 'Paskutinį kartą bandyta:',
        'begin-dictation-mode': 'pradėti diktavimo režimą',
        'exit-dictation-mode': 'išeiti iš diktavimo režimo',
        'minimize-commands': 'paslėpti komandas',
        'voice-group.text-formatting': 'Teksto formatavimas',
        'voice-group.text-navigation': 'Teksto navigacija',
        'voice-group.table': 'Lentelė',
        'voice-group.document-formatting': 'Dokumento formatavimas',
        'voice-group.history': 'Istorija',
        'voice-group.text-alignment': 'Teksto lygiavimas',
        'voice-dictation.period': 'taškas',
        'voice-dictation-space.period': ' taškas',
        'voice-dictation.comma': 'kablelis',
        'voice-dictation-space.comma': ' kablelis',
        'voice-dictation.colon': 'dvitaškis',
        'voice-dictation-space.colon': ' dvitaškis',
        'voice-dictation.semi-colon': 'kabliataškis',
        'voice-dictation-space.semi-colon': ' kabliataškis',
        'voice-dictation.question-mark': 'klaustukas',
        'voice-dictation-space.question-mark': ' klaustukas',
        'voice-dictation.exclamation-mark': 'šauktukas',
        'voice-dictation-space.exclamation-mark': ' šauktukas',
        'voice-dictation.open-parenthesis': 'atidaromas skliaustas',
        'voice-dictation.close-parenthesis': 'uždaromas skliaustas',
        'voice-dictation-space.close-parenthesis': ' uždaromas skliaustas',
        'voice-dictation.open-bracket': 'atidaromas laužtinis skliaustas',
        'voice-dictation.close-bracket': 'uždaromas laužtinis skliaustas',
        'voice-dictation-space.close-bracket': ' uždaromas laužtinis skliaustas',
        'voice-dictation.open-brace': 'atidaromas riestinis skliaustas',
        'voice-dictation.close-brace': 'uždaromas riestinis skliaustas',
        'voice-dictation-space.close-brace': ' uždaromas riestinis skliaustas',
        'voice-dictation.quote': 'kabutės',
        'voice-dictation.single-quote': 'vienos kabutės',
        'voice-dictation.apostrophe': 'apostrofa',
        'voice-dictation.backslash': 'atgalinis brūkšnys',
        'voice-dictation.forward-slash': 'pirmyninis brūkšnys',
        'voice-dictation.asterisk': 'žvaigždutė',
        'voice-dictation.ampersand': 'ampersandas',
        'voice-dictation.hashtag': 'grotelė',
        'voice-dictation.hashtag-space': ' grotelė',
        'accessibility.text': 'Prieinamumas',
      },
    },
  });