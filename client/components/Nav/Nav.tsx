import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import Switcher from '../DarkMode/DarkMode'
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
    <nav className=" p-10 flex 2-[250px] lg:w-[300px] rounded-md bg-blue-100 ">
      <ul className="text-xl w-full lg:text-2xl">
        <li>
          <button
            className="text-black font-bold hover:scale-125 ease-in duration-100 hover:max-w-full h-0.5  hover:text-blue-400 mb-2"
            onClick={() => goTo('/my-wardrobe')}
          >
            My wardrobe
          </button>
        </li>
        <li>
          <button
            className="text-black font-bold hover:scale-125 ease-in duration-100 hover:max-w-full h-0.5  hover:text-blue-400 mb-2"
            onClick={() => goTo('/friend-list')}
          >
            My friends
          </button>
        </li>
        <li>
          <button
            className="text-black font-bold hover:scale-125 ease-in duration-100 hover:max-w-full h-0.5  hover:text-blue-400 mb-2"
            onClick={() => goTo('/add-item')}
          >
            Add an Item
          </button>
        </li>
        <li>
          <button
            className="text-black font-bold hover:scale-125 ease-in duration-100 hover:max-w-full h-0.5  hover:text-blue-400 mb-2"
            onClick={() => goTo('/find-friend')}
          >
            Find User
          </button>
        </li>
        <li>
          <button
            className="text-black font-bold hover:scale-125 ease-in duration-100 hover:max-w-full h-0.5  hover:text-blue-400 mb-2"
            onClick={() => goTo('/outfit')}
          >
            My Outfit
          </button>
        </li>
        <li>
          <button
            className="text-black font-bold hover:scale-125 ease-in duration-100 hover:max-w-full h-0.5  hover:text-blue-400 mb-2"
            onClick={() => goTo('/credit')}
          >
            Credits
          </button>
        </li>
        <li>
          {isAuthenticated && (
            <button
              className="text-orange text-[20px] hover:scale-125 ease-in duration-100 font-bold hover:max-w-full h-0.5  hover:text-blue-400 mb-2 mt-4"
              onClick={handleLogout}
            >
              Sign out
            </button>
          )}
        </li>
      </ul>
      <div className="flex w-[50px] text-black justify-end">
        <Switcher />
      </div>
    </nav>
  )
}

export default Nav
