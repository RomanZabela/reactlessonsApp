import { useTranslation } from "react-i18next";
import "./ErrorMessage.css"

export const ErrorMessage = ({ message }: { message: string }) => {
    const {t} = useTranslation('error');
    return (
        <div className="error-box">
        <strong className="error-title">{t('errorTitle')}: </strong>
        <span>{message}</span>
        </div>
    )
}