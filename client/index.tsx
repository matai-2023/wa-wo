import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Auth0Provider } from '@auth0/auth0-react'


import App from './components/App'
import Home from './Pages/Home/Home'
import ErrorPage from './Pages/ErrorPage/ErrorPage'

export const routes = createRoutesFromElements(
  <Route path="*" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} />
  </Route>
)

function AppProvider() {
  return <RouterProvider router={createBrowserRouter(routes)} />
}

const queryClient = new QueryClient()

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="youn.au.auth0.com"
      clientId='6BcrxurWcfVZiNadfzUFs7kyxSwFx908'
      redirectUri={window.location.origin}
      audience='https://wardrobe/api'
    >
      <QueryClientProvider client={queryClient}>
        <AppProvider />
      </QueryClientProvider>
    </Auth0Provider>
  )
})