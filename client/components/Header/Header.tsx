import { useState } from 'react'
import Title from '../Title/Title'
import Nav from '../Nav/Nav'
import { IfAuthenticated } from '../../apis/Authenticated'
import { Link } from 'react-router-dom'
import { GiClothes } from 'react-icons/gi'
import { useAuth0 } from '@auth0/auth0-react'
import {AiOutlineSearch} from 'react-icons/ai'
function Header() {
  const [navOpened, setNavOpened] = useState(false)
  const { logout } = useAuth0()
  function toggleMenu() {
    setNavOpened((prevNavOpened) => !prevNavOpened)
  }

  function handleLogout() {
    logout({ returnTo: window.location.origin })
  }

  return (
    <>
      <div className="flex justify-between mb-6">
        <div>
          <Title />
        </div>

        <div className="hidden lg:block absolute right-[100px] top-[30px]">
          <IfAuthenticated>
            <div className="flex right-0">
              <div className="mt-[14px] mr-4">
                <Link className="text-3xl" to={'/find-friend'}>
              <AiOutlineSearch/>
              </Link>
              </div>
              <div className="mt-4 mr-4">
                <Link to="/profile">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
              <div className="mt-4 mr-4">
                <Link className="text-3xl" to="/my-wardrobe">
                  <GiClothes />
                </Link>
              </div>
              <div className="mt-4 mr-6">
                <button
                  className=" text-black font-bold hover:max-w-full transition-all duration-500 h-0.5  hover:text-blue-400 mb-2"
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              </div>
            </div>
          </IfAuthenticated>
        </div>

        <div className="absolute z-50 pl-4 pt-3 pr-4 flex justify-between items-center">
          <IfAuthenticated>
            {!navOpened && (
              <div>
                <button
                  className="fixed top-10 right-10 hover:text-blue-400"
                  onClick={toggleMenu}
                >
                  <i className="fa-solid fa-bars text-4xl absolute top-0 right-0 h-10 w-10"></i>
                </button>
              </div>
            )}
          </IfAuthenticated>
          {navOpened && (
            <button
              className="fixed top-10 right-10 hover:text-blue-400"
              onClick={toggleMenu}
            >
              <i className="fa-solid fa-times text-3xl transition ease-in-out focus:-rotate-45 duration-300 absolute top-0 right-0 h-10 w-10"></i>
            </button>
          )}

          <nav
            className={`text-orange fixed right-20 top-[100px] h-0  backdrop-filter backdrop-blur-md bg-opacity-5 shadow-transparent transition-all ease-in-out duration-200 ${
              navOpened ? 'opacity-100' : 'hidden'
            }`}
          >
            <Nav toggleMenu={toggleMenu} />
          </nav>
        </div>
      </div>
    </>
  )
}

export default Header
