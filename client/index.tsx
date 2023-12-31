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
import ProfileForm from './components/Profile/Profile.tsx'
import FriendList from './Pages/FriendList/FriendList.tsx'
import ProtectedComponent from './components/UI/Protector.tsx'
import FindFriends from './Pages/FindFriend/FindFriend.tsx'

import AddItem from './components/WardrobeList/AddItem.tsx'

import FriendsWardrobe from './Pages/FriendsWardrobe/FriendsWardrobe.tsx'

import Credits from './Pages/Credits/Credits.tsx'
import Outfit from './Pages/Outfit/Outfit.tsx'
import AddOutfitForm from './Pages/AddOutfit/AddOutfitForm.tsx'
import Test from './Pages/Testing/Test.tsx'

export const routes = createRoutesFromElements(
  <Route path="/" element={<AppLayout />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} />
    <Route
      path="/my-wardrobe"
      element={<ProtectedComponent component={MyWardrobe} />}
    />
    <Route
      path="/add-item"
      element={<ProtectedComponent component={AddItem} />}
    />
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
      element={<ProtectedComponent component={ProfileForm} />}
    />
    <Route
      path="/friend/:id"
      element={<ProtectedComponent component={FriendsWardrobe} />}
    />
    <Route path="/outfit" element={<ProtectedComponent component={Outfit} />} />
    <Route
      path="/outfit/add"
      element={<ProtectedComponent component={AddOutfitForm} />}
    />
    <Route path="/testing" element={<Test />} />
    <Route path="/credit" element={<Credits />} />
  </Route>
)

function AppProvider() {
  return <RouterProvider router={createBrowserRouter(routes)} />
}

const queryClient = new QueryClient()
document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      domain={import.meta.env.VITE_AUTH0_DOMAIN as string}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID as string}
      redirectUri={window.location.origin}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      audience={import.meta.env.VITE_AUTH0_AUDIENCE as string}
    >
      <QueryClientProvider client={queryClient}>
        <AppProvider />
      </QueryClientProvider>
    </Auth0Provider>
  )
})
