import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const routes = createRoutesFromElements(
  <Route path="*" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} />
  </Route>
)

function AppProvider() {
  return <RouterProvider router={createBrowserRouter(routes)} />
}

import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/App.tsx'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="youn.au.auth0.com"
      clientId="6BcrxurWcfVZiNadfzUFs7kyxSwFx908"
      redirectUri={window.location.origin}
      audience="https://wardrobe/api"
    >
      <Router>
        <App />
      </Router>
    </Auth0Provider>
  )
})
