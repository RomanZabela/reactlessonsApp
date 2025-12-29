import { Outlet, useNavigate } from 'react-router-dom'
import { Sidebar } from './shared/components/Sidebar/Sidebar'
import { useSidebarStore } from './shared/stores/useSidebarStore';
import { ToastContainer } from './shared/components/Toast/ToastContainer';
import { useTranslation } from 'react-i18next';
import { useLangDirection } from './hooks/useLangDirection';
import { ThemeSwitch } from './shared/components/ThemeSwitch/ThemeSwitch';
import { useThemeStore } from './shared/stores/useThemeStore';
import { Button } from 'primereact/button';
import './App.css'

function App() {
  const {isOpen, toggle} = useSidebarStore();
  const navigate = useNavigate();
  const {t, i18n} = useTranslation('common');
  const {theme} = useThemeStore();

  useLangDirection();

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  }

  return (
    <div className={`app-container ${theme === 'lara-dark-blue' ? 'dark-theme' : 'light-theme'}`}>
      <Sidebar />
      <ToastContainer />
      <div className={`main-content ${isOpen ? 'blurred' : ''}`}>
        <nav className='top-nav'>
          <Button
            icon="pi pi-bars"
            label={t('header.menu')}
            onClick={toggle}
            text
            severity='secondary'
            className='nav-button'
          />
          <Button
            icon="pi pi-home"
            label={t('header.home')}
            onClick={() => navigate('/')}
            text
            severity='secondary'
            className='nav-button'
          />
          <Button
            label={t('header.about')}
            onClick={() => navigate('/about')}
            text
            severity='secondary'
            className='nav-button'
          />
          <Button
            icon="pi pi-shopping-cart"
            label={t('header.products')}
            onClick={() => navigate('/products')}
            text
            severity='secondary'
            className='nav-button'
          />
          <div className='language-switcher'>
            <select
              value={i18n.language}
              onChange={changeLanguage}
              className='language-select'
            >
              <option value="en">English</option>
              <option value="he">עברית</option>
            </select>
          </div>
          <ThemeSwitch />
        </nav>
      
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
