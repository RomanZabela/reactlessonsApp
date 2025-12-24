import { useSidebarStore } from "../../stores/useSidebarStore";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
    const {isOpen, toggle} = useSidebarStore();
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
        toggle();
    }

    if (!isOpen) return null;

    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <h2>Menu</h2>
                <button className="close-btn" onClick={toggle}>✕</button>
            </div>

            <nav className="sidebar-nav">
                <button onClick={() => handleNavigation('/')}>Home</button>
                <button onClick={() => handleNavigation('/about')}>About</button>
                <button onClick={() => handleNavigation('/products')}>Products</button>
            </nav>
        </aside>
    );
}