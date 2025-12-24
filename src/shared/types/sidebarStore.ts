export interface SidebarStore {
    isOpen: boolean;
    toggle: () => void;
    open: () => void;
}