import i18next, { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { ELanguages } from '@renderer/constants/i18n';
import { STORAGE } from '@renderer/constants/storage';
import en from './locales/en.json';
import vi from './locales/vi.json';

const languageDetector: LanguageDetectorAsyncModule = {
    type: 'languageDetector',
    async: true,
    detect: (cb) => cb(ELanguages.EN),
    init: () => {},
    cacheUserLanguage: () => {},
};

const resources = {
    vi: { translation: vi },
    en: { translation: en },
};

(i18next.use(languageDetector).use(initReactI18next) as any)?.init({
    fallbackLng: ELanguages.EN,
    debug: false,
    resources: resources,
    compatibilityJSON: 'v3',
});

const initLanguage = () => {
    const initialLanguage = localStorage.getItem(STORAGE.language) || ELanguages.EN;
    i18next.changeLanguage(initialLanguage);
};

const setLanguage = (value: ELanguages) => {
    localStorage.setItem(STORAGE.language, value);
    i18next.changeLanguage(value);
};

const languageOptions = [
    {
        label: 'Vietnamese',
        value: ELanguages.VI,
    },
    {
        label: 'English',
        value: ELanguages.EN,
    },
];

export { initLanguage, languageOptions, setLanguage };

const I18nApp = i18next;
export default I18nApp;
