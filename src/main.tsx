import './index.css'
import App from './App.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Home, About, NotFound, ProductDetail, ProductList } from './pages'
import { createRoot } from 'react-dom/client'
import './i18n/config.ts';
import { UserProfileForm } from './pages/UserProfileForm/UserProfileForm.tsx'

const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') as string || 'lara-light-blue' : 'lara-light-blue';

const linkElement = typeof window !== 'undefined' ? document.getElementById('theme-link') as HTMLLinkElement : null;

if (linkElement) {
  linkElement.href = `https://unpkg.com/primereact/resources/themes/${savedTheme}/theme.css`;
}

const queryClient = new QueryClient()

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />} >
        <Route index element={<UserProfileForm />} />
        <Route path='home' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='products' element={<ProductList />} />
        <Route path='products/:id' element={<ProductDetail/>} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </>
  )
)

createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)