import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Auth0Provider } from '@auth0/auth0-react'
import AppLayout from './components/AppLayout/AppLayout.tsx'
import Home from './Pages/Home/Home.tsx'
import MyWardrobe from './Pages/MyWardrobe/MyWardrobe.tsx'
import ErrorPage from './Pages/ErrorPage/ErrorPage.tsx'
import RegisterForm from './components/Signin/RegisterForm.tsx'
import FriendList from './Pages/FriendList/FriendList.tsx'
import ProtectedComponent from './components/UI/Protector.tsx'
import FindFriends from './Pages/FindFriend/FindFriend.tsx'

export const routes = createRoutesFromElements(
  <Route path="/" element={<AppLayout />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} />
    <Route
      path="/my-wardrobe"
      element={<ProtectedComponent component={MyWardrobe} />}
    />
    {/* <Route path="/add-clothes" element={<ProtectedComponent component={AddClothes} />}/> */}
    <Route
      path="/friend-list"
      element={<ProtectedComponent component={FriendList} />}
    />
    <Route
      path="/find-friend"
      element={<ProtectedComponent component={FindFriends} />}
    />
    <Route
      path="/profile"
      element={<ProtectedComponent component={RegisterForm} />}
    />
    {/* <Route path="/friend/:id" element={<ProtectedComponent component={FriendWardrobe} />}/> */}
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
      clientId="6BcrxurWcfVZiNadfzUFs7kyxSwFx908"
      redirectUri={window.location.origin}
      audience="https://wardrobe/api"
    >
      <QueryClientProvider client={queryClient}>
        <AppProvider />
      </QueryClientProvider>
    </Auth0Provider>
  )
})
