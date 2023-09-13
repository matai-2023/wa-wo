import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

interface Props {
  toggleMenu: () => void
}

function Nav(props: Props) {
  const { isAuthenticated, logout } = useAuth0()
  const navigate = useNavigate()

  // function handleLogin() {
  //   loginWithRedirect({
  //     authorizationParams: {
  //       redirect_uri: `${window.location.origin}/my-songs`,
  //     },
  //   })
  // }

  function handleLogout() {
    logout({ returnTo: window.location.origin })
  }

  function goTo(link: string) {
    props.toggleMenu()
    navigate(link)
  }

  return (
    <nav className="pt-16 pl-4 flex absolute top-0 right-0">
      <ul className="text-3xl">
        <li>
          <button onClick={() => goTo('/my-wardrobe')}>My wardrobe</button>
        </li>
        <li>
          <button onClick={() => goTo('/friend-list')}>My friends</button>
        </li>
        <li>
          <button onClick={() => goTo('/profile')}>Add an Item</button>
        </li>
        <li>
          <button onClick={() => goTo('/find-friend')}>Add a friend</button>
        </li>
        {/* <li>
          {!isAuthenticated && <button onClick={handleLogin}>Log in</button>}
        </li> */}
        <li>
          {isAuthenticated && <button onClick={handleLogout}>Log out</button>}
        </li>
      </ul>
    </nav>
  )
}

export default Nav
