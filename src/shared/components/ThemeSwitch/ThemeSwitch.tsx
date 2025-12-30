import { useEffect } from "react";
import { useThemeStore } from "../../stores/useThemeStore";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

export const ThemeSwitch = () => {
    const {theme, setTheme} = useThemeStore();

    const {t} = useTranslation('common');

    useEffect(() => {
        const linkElement = document.getElementById('theme-link') as HTMLLinkElement;
        if (linkElement) {
            linkElement.href = `https://unpkg.com/primereact/resources/themes/${theme}/theme.css`;
        }
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'lara-light-blue' ? 'lara-dark-blue' : 'lara-light-blue';
        setTheme(newTheme);
    };

    return (
        <Button 
        icon={theme === 'lara-light-blue' ? 'pi pi-moon' : 'pi pi-sun'}
        rounded
        text
        severity="secondary"
        onClick={toggleTheme}
        aria-label={t('buttons.changeLanguage')}
        />
    );
}