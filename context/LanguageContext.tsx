import React, { createContext, useContext, useState } from 'react';
import { translations } from '@/constants/translations';
import I18n from 'i18n-js';

I18n.defaultLocale = 'es';
I18n.locale = 'es';
I18n.fallbacks = true;
I18n.translations = {
  es: translations.es
};

export const LanguageContext = createContext({
  locale: 'es',
  setLocale: (locale: string) => {},
  t: (scope: string, options?: any) => '',
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState('es');

  const t = (scope: string, options?: any) => {
    return I18n.t(scope, options);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe ser usado dentro de un LanguageProvider');
  }
  return context;
};
