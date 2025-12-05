import './App.css'
import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <div>
      <nav style={{ display: 'flex', gap: '1rem', marginBottom: '20px' }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Outlet />
    </div>
  )
}

export default App
