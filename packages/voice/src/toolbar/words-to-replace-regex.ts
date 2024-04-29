import { Translate } from '@rrte/i18n';

export const createWordsToChange = (t: Translate) => {
  return {
    [t('voice-dictation.period')]: '.',
    [t('voice-dictation-space.period')]: '.',
    [t('voice-dictation.comma')]: ',',
    [t('voice-dictation-space.comma')]: ',',
    [t('voice-dictation.colon')]: ':',
    [t('voice-dictation-space.colon')]: ':',
    [t('voice-dictation.semi-colon')]: ';',
    [t('voice-dictation-space.semi-colon')]: ';',
    [t('voice-dictation.question-mark')]: '?',
    [t('voice-dictation-space.question-mark')]: '?',
    [t('voice-dictation.exclamation-mark')]: '!',
    [t('voice-dictation-space.exclamation-mark')]: '!',
    [t('voice-dictation.open-parenthesis')]: '(',
    [t('voice-dictation.close-parenthesis')]: ')',
    [t('voice-dictation-space.close-parenthesis')]: ')',
    [t('voice-dictation.open-bracket')]: '[',
    [t('voice-dictation.close-bracket')]: ']',
    [t('voice-dictation-space.close-bracket')]: ']',
    [t('voice-dictation.open-brace')]: '{',
    [t('voice-dictation.close-brace')]: '}',
    [t('voice-dictation-space.close-brace')]: '}',
    [t('voice-dictation.quote')]: '"',
    [t('voice-dictation.single-quote')]: "'",
    [t('voice-dictation.apostrophe')]: "'",
    [t('voice-dictation.backslash')]: '\\',
    [t('voice-dictation.forward-slash')]: '/',
    [t('voice-dictation.asterisk')]: '*',
    [t('voice-dictation.ampersand')]: '&',
    [t('voice-dictation.hashtag')]: '#',
    [t('voice-dictation.hashtag-space')]: '#',
  };
};

export const createWordsToReplaceRegex = (wordsToChange: Record<string, string>) => {
  const regexPattern = Object.keys(wordsToChange)
    .sort((a, b) => b.length - a.length)
    .map(key => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');

  return new RegExp(`\\b(${regexPattern})\\b`, 'gi');
};
