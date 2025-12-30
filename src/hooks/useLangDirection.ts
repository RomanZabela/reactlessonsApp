import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useLangDirection = () => {
    const {i18n} = useTranslation();

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && savedLanguage !== i18n.language) {
            i18n.changeLanguage(savedLanguage);
        }
    }, []);

    useEffect(() => {
        const direction = i18n.language === 'he' ? 'rtl' : 'ltr';
        document.documentElement.dir = direction;
        document.documentElement.lang = i18n.language;

        localStorage.setItem('language', i18n.language);
    }, [i18n.language]);
};