import { createContext, useContext, useEffect, useState } from 'react';

import i18next from 'i18next';

export type Translate = (key: string) => string;

type I18nContext = {
  t: Translate;
};

export const i18nContext = createContext<I18nContext | null>(null);

export const I18nProvider = ({
  children,
  language,
  resources,
}: {
  children: React.ReactNode;
  language: 'lt' | 'en';
  resources: Record<string, Record<string, string>>;
}) => {
  const [_, setIsInitialized] = useState(false);

  useEffect(() => {
    i18next.init({
      lng: language,
      resources,
    });

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (i18next.language !== language) {
      i18next.changeLanguage(language);
    }
  }, [language]);

  return <i18nContext.Provider value={{ t: i18next.t }}>{children}</i18nContext.Provider>;
};

export const useTranslations = () => {
  const context = useContext(i18nContext);

  if (!context) {
    throw new Error('useTranslations must be used within an I18nProvider');
  }

  return context;
};
