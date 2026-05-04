'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { translations, type Lang, type TranslationKey } from './i18n';

interface LanguageContextType {
  lang: Lang;
  t: (key: TranslationKey) => string;
  toggleLang: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ar');
  const isRTL = lang === 'ar';

  const t = (key: TranslationKey): string => {
    return translations[lang][key] || key;
  };

  const toggleLang = () => {
    const next = lang === 'ar' ? 'fr' : 'ar';
    setLang(next);
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = next;
  };

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLang must be used within LanguageProvider');
  return context;
}
