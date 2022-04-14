import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/locales/en.json';
import zh from '@/locales/zh.json';
import { AppCachedKeys } from './const';
import { fetchCachedData, storeCachedData } from './cache';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en,
  zh
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // use en if detected lng is not available
    debug: true,
    // keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

/**
 * change language
 * @param lan
 */
const changeLanguage = (lan: 'en' | 'zh') => {
  if (lan.indexOf('zh') !== -1) {
    i18n.changeLanguage('zh');
  } else {
    i18n.changeLanguage('en');
  }
  storeCachedData(AppCachedKeys.AppLanguage, lan);
};

/**
 * get language
 * @returns language
 */
const currentLanguage = (): 'en' | 'zh' | null => {
  return fetchCachedData<'en' | 'zh'>(AppCachedKeys.AppLanguage);
};

export { changeLanguage, currentLanguage };
export default i18n;
