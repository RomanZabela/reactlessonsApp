import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { Sidebar } from './shared/components/Sidebar/Sidebar'
import { useSidebarStore } from './shared/stores/useSidebarStore';
import { ToastContainer } from './shared/components/Toast/ToastContainer';

function App() {
  const {isOpen, toggle} = useSidebarStore();
  const navigate = useNavigate();

  return (
    <div className='app-container'>
      <Sidebar />
      <ToastContainer />
      <div className={`main-content ${isOpen ? 'blurred' : ''}`}>
        <nav className='top-nav'>
          <button onClick={toggle} className='menu-toggle'>
            ☰ Menu
          </button>
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/about')}>About</button>
          <button onClick={() => navigate('/products')}>Products</button>
        </nav>
      
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
