import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { Suspense, lazy } from 'react'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Auth0Provider } from '@auth0/auth0-react'


import App from './components/App'
// import AppLayout from './components/AppLayout/AppLayout'

// const ProfilePage = lazy(() => import('./Pages/ProfilePage/ProfilePage'))
const Home = lazy(() => import('./Pages/Home/Home'))
// const MyFriends = lazy(() => import('./Pages/MyFriends/MyFriends'))
// const FindFriends = lazy(() => import('./Pages/FindFriends/FindFriends'))
// const MySongs = lazy(() => import('./Pages/MySongs/MySongs'))
// const EditSong = lazy(() => import('./Pages/MySongs/EditSong'))
// import ErrorPage from './Pages/ErrorPage/ErrorPage'


export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
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
      domain=""
      clientId=''
      redirectUri={window.location.origin}
      audience=''
    >
      <QueryClientProvider client={queryClient}>
        <AppProvider />
      </QueryClientProvider>
    </Auth0Provider>
  )
})