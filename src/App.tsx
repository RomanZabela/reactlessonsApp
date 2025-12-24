import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { Sidebar } from './shared/components/Sidebar/Sidebar'
import { useSidebarStore } from './shared/stores/useSidebarStore';
import { ToastContainer } from './shared/components/Toast/ToastContainer';
import { useTranslation } from 'react-i18next';
import { useLangDirection } from './hooks/useLangDirection';

function App() {
  const {isOpen, toggle} = useSidebarStore();
  const navigate = useNavigate();
  const {t, i18n} = useTranslation('common');

  useLangDirection();

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  }

  return (
    <div className='app-container'>
      <Sidebar />
      <ToastContainer />
      <div className={`main-content ${isOpen ? 'blurred' : ''}`}>
        <nav className='top-nav'>
          <button onClick={toggle} className='menu-toggle'>
            ☰ {t('header.menu')}
          </button>
          <button onClick={() => navigate('/')}>{t('header.home')}</button>
          <button onClick={() => navigate('/about')}>{t('header.about')}</button>
          <button onClick={() => navigate('/products')}>{t('header.products')}</button>
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
        </nav>
      
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
