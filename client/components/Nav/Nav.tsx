import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

interface Props {
  toggleMenu: () => void
}

function Nav(props: Props) {
  const { isAuthenticated, logout } = useAuth0()
  const navigate = useNavigate()

  function handleLogout() {
    logout({ returnTo: window.location.origin })
  }

  function goTo(link: string) {
    props.toggleMenu()
    navigate(link)
  }

  return (
    <nav className="pt-8 pl-4 pr-4 flex ">
      <ul className="text-3xl">
        <li>
          <button
            className="font-bold hover:text-blue-400 mb-2"
            onClick={() => goTo('/my-wardrobe')}
          >
            My wardrobe
          </button>
        </li>
        <li>
          <button
            className="font-bold hover:text-blue-400 mb-2"
            onClick={() => goTo('/friend-list')}
          >
            My friends
          </button>
        </li>
        <li>
          <button
            className="font-bold hover:text-blue-400 mb-2"
            onClick={() => goTo('/add-item')}
          >
            Add an Item
          </button>
        </li>
        <li>
          <button
            className="font-bold hover:text-blue-400 mb-2"
            onClick={() => goTo('/find-friend')}
          >
            Find User
          </button>
        </li>
        <li>
          {isAuthenticated && (
            <button
              className="font-bold hover:text-blue-400 mb-2"
              onClick={handleLogout}
            >
              Log out
            </button>
          )}
        </li>
        <li>
          <button
            className="font-bold hover:text-blue-400 mb-2"
            onClick={() => goTo('/credit')}
          >
            Credits
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
