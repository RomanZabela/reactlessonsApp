import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const About = () => {
    const {t, i18n} = useTranslation(['about', 'common']);
    const [title, setTitle] = useState(t('about:title'));

    useEffect(() => {
        setTitle(t('about:title'));
    }, [i18n.language, t]);
    return (
        <div>
            <h1>{title}</h1>
            <p>{t('about:description')}</p>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
            />
            <button onClick={() => setTitle(t('about:newTitle'))}>{t('common:buttons.update')}</button>
        </div>
    )
}