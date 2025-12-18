import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { Sidebar } from './shared/components/Sidebar/Sidebar'
import { useSidebarStore } from './shared/stores/useSidebarStore';
import { ToastContainer } from './shared/components/Toast/ToastContainer';

function App() {
  const {isOpen, toggle} = useSidebarStore();
  const navigator = useNavigate();

  return (
    <div className='app-container'>
      <Sidebar />
      <ToastContainer />
      <div className={`main-content ${isOpen ? 'with-sidebar' : ''}`}>
        <nav className='top-nav'>
          <button onClick={toggle} className='menu-toggle'>
            {isOpen ? '✕ Close Menu' : '☰ Menu'}
          </button>
          <button onClick={() => navigator('/')}>Home</button>
          <button onClick={() => navigator('/about')}>About</button>
          <button onClick={() => navigator('/products')}>Products</button>
        </nav>
      
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
