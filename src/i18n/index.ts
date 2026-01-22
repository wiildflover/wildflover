/**
 * File: index.ts
 * Author: Wildflover
 * Description: i18n configuration with multi-language support
 * Language: TypeScript
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import locale files
import en from './locales/en.json';
import tr from './locales/tr.json';
import ar from './locales/ar.json';
import zh from './locales/zh.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import de from './locales/de.json';
import es from './locales/es.json';

// [CONSTANTS] LocalStorage key for language preference
const LANGUAGE_STORAGE_KEY = 'wildflover_language';

// [SUPPORTED-LANGUAGES] Available language configurations
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: 'EN', rtl: false },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: 'TR', rtl: false },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: 'AR', rtl: true },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: 'ZH', rtl: false },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: 'JA', rtl: false },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: 'KO', rtl: false },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: 'DE', rtl: false },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: 'ES', rtl: false }
] as const;

export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code'];

// [UTILS] Get saved language from localStorage
const getSavedLanguage = (): LanguageCode => {
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
      return saved as LanguageCode;
    }
  } catch (e) {
    console.warn('[I18N-LOAD] Failed to load saved language');
  }
  return 'en';
};

const initialLanguage = getSavedLanguage();

const resources = {
  en: { translation: en },
  tr: { translation: tr },
  ar: { translation: ar },
  zh: { translation: zh },
  ja: { translation: ja },
  ko: { translation: ko },
  de: { translation: de },
  es: { translation: es }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

// [RTL] Apply RTL direction if needed
const initialLang = SUPPORTED_LANGUAGES.find(l => l.code === initialLanguage);
if (initialLang?.rtl) {
  document.documentElement.dir = 'rtl';
}

console.log('[I18N-INIT] Language initialized:', initialLanguage);

// [CHANGE-LANGUAGE] Change language and persist
export const changeLanguage = async (langCode: LanguageCode): Promise<void> => {
  const previousLang = i18n.language;
  
  // [GUARD] Skip if same language
  if (previousLang === langCode) {
    console.log('[I18N-CHANGE] Same language, skipping:', langCode);
    return;
  }
  
  console.log('[I18N-CHANGE] Changing language:', previousLang, '->', langCode);
  
  // [STEP-1] Clear ALL caches BEFORE changing language - critical order
  try {
    const { championService, skinService } = await import('../services/api');
    
    // Clear all caches first - both memory and localStorage
    skinService.clearCache();
    championService.clearCache();
    
    // Set new locale for skin service
    skinService.setLocale(langCode);
    
    console.log('[I18N-CACHE] All caches cleared before locale change');
  } catch (e) {
    console.warn('[I18N-API] Failed to clear caches:', e);
  }
  
  // [STEP-2] Save to localStorage
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, langCode);
  } catch (e) {
    console.warn('[I18N-SAVE] Failed to save language preference');
  }
  
  // [STEP-3] Update RTL direction
  const lang = SUPPORTED_LANGUAGES.find(l => l.code === langCode);
  document.documentElement.dir = lang?.rtl ? 'rtl' : 'ltr';
  
  // [STEP-4] Change i18n language - this triggers 'languageChanged' event
  await i18n.changeLanguage(langCode);

  // [STEP-5] Refresh Discord RPC
  try {
    const { discordRpc } = await import('../services/discord/rpc');
    await discordRpc.refreshActivity();
  } catch (e) {
    console.warn('[I18N-RPC] Failed to refresh Discord RPC');
  }
  
  console.log('[I18N-CHANGE] Language change complete:', langCode);
};

export const getCurrentLanguage = (): LanguageCode => {
  return (i18n.language || 'en') as LanguageCode;
};

export const getLanguageInfo = (code: LanguageCode) => {
  return SUPPORTED_LANGUAGES.find(l => l.code === code);
};

export default i18n;
