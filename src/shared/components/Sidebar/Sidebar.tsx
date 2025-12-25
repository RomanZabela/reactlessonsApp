import { useTranslation } from "react-i18next";
import { useSidebarStore } from "../../stores/useSidebarStore";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
    const {isOpen, toggle} = useSidebarStore();
    const navigate = useNavigate();
    const {t} = useTranslation('common');

    const handleNavigation = (path: string) => {
        navigate(path);
        toggle();
    }

    if (!isOpen) return null;

    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <h2>{t('sidebar.menu')}</h2>
                <button className="close-btn" onClick={toggle}>✕</button>
            </div>

            <nav className="sidebar-nav">
                <button onClick={() => handleNavigation('/')}>{t('sidebar.home')}</button>
                <button onClick={() => handleNavigation('/about')}>{t('sidebar.about')}</button>
                <button onClick={() => handleNavigation('/products')}>{t('sidebar.products')}</button>
            </nav>
        </aside>
    );
}