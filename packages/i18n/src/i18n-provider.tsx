import { createContext, useContext, useEffect, useState } from 'react';

import i18next from 'i18next';

export { i18next };

export type Translate = (key: string) => string;

export const supportedLanguages = ['lt', 'en'] as const;

export type SupportedLanguages = (typeof supportedLanguages)[number];

export type Resources = Record<SupportedLanguages, Record<string, string>>;

type I18nContext = {
  t: Translate;
  language: SupportedLanguages;
};

export const i18nContext = createContext<I18nContext | null>(null);

export const I18nProvider = ({
  children,
  language,
  resources,
}: {
  children: React.ReactNode;
  language: 'lt' | 'en';
  resources: Resources;
}) => {
  const [_, setIsInitialized] = useState(false);

  const resourceLanguages = Object.keys(resources);

  const resourcesToAdd = resourceLanguages.reduce(
    (acc, lang) => {
      if (lang !== 'lt' && lang !== 'en') {
        return acc;
      }

      return {
        ...acc,
        [lang]: {
          translation: resources[lang],
        },
      };
    },
    {} as Record<SupportedLanguages, Record<'translation', Record<string, string>>>
  );

  useEffect(() => {
    i18next.init({
      lng: language,
      resources: resourcesToAdd,
    });

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (i18next.language !== language) {
      i18next.changeLanguage(language);
    }
  }, [language]);

  return <i18nContext.Provider value={{ t: i18next.t, language }}>{children}</i18nContext.Provider>;
};

export const useTranslations = () => {
  const context = useContext(i18nContext);

  if (!context) {
    throw new Error('useTranslations must be used within an I18nProvider');
  }

  return context;
};
