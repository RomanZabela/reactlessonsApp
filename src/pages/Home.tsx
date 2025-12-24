import { useState } from "react";
import { useToastStore } from "../shared/stores/useToastStore";
import { useTranslation } from "react-i18next";

export const Home = () => {
    const [count, setCount] = useState(0);
    const { addToast } = useToastStore();
    const {t} = useTranslation(['common', 'home']);

    const handleIncrement = () => {
        const newCount = count + 1;
        setCount(newCount);
        addToast(t('common:messages.success', { count: newCount }), 'success', 2000);
    };

    return (
        <div>
            <h1>{t('home:title')}</h1>
            <p>{t('home:count', { count })}</p>
            <button onClick={handleIncrement}>{t('common:buttons.increment')}</button>
        </div>
    );
}