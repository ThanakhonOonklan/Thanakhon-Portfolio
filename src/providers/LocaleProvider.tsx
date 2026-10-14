'use client';

import '@/lib/i18n'; // Initialize i18next
import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { Locale } from '@/types';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  // Derived from i18n so there is a single source of truth (re-renders on languageChanged)
  const locale: Locale = i18n.language === 'th' ? 'th' : 'en';

  // Restore persisted locale choice after hydration
  useEffect(() => {
    const savedLocale = localStorage.getItem('portfolio-locale');
    if (savedLocale === 'en' || savedLocale === 'th') {
      i18n.changeLanguage(savedLocale);
    }
  }, [i18n]);

  const setLocale = (newLocale: Locale) => {
    i18n.changeLanguage(newLocale);
    localStorage.setItem('portfolio-locale', newLocale);
  };

  // Sync state to <html> lang attribute for CSS font mapping
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocaleContext must be used within a LocaleProvider');
  }
  return context;
}
