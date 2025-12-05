import './index.css'
import App from './App.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Home, About, NotFound } from './pages'
import { createRoot } from 'react-dom/client'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />} >
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </>
  )
)

createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)