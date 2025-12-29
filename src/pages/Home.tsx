import { useState } from "react";
import { useToastStore } from "../shared/stores/useToastStore";
import { useTranslation } from "react-i18next";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

import "./Home.css";

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
        <div className="home-container">
            <Card title={t('home:title')}>
            <p className="count-info">
                {t('home:count', { count })}
            </p>
            <Button 
                label={t('home:button')} 
                icon="pi pi-plus" 
                onClick={handleIncrement}
                severity="success"                   
            />
            </Card>
        </div>
    );
}