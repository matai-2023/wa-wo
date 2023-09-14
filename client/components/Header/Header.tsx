import { useState } from 'react'
import Logo from '../Logo/Logo'
import Nav from '../Nav/Nav'
import { IfAuthenticated } from '../../apis/Authenticated'
function Header() {
  const [navOpened, setNavOpened] = useState(false)

  function toggleMenu() {
    setNavOpened((prevNavOpened) => !prevNavOpened)
  }

  const isLandingPage = location.pathname === '/'

  return (
    <div className="pl-4 pt-3 pr-4 flex justify-between items-center">
      <Logo />

      <IfAuthenticated>
        {!navOpened && (
          <div>
            <button className="fixed top-10 right-10" onClick={toggleMenu}>
              <i className="fa-solid fa-bars text-4xl absolute top-0 right-0 h-10 w-10"></i>
            </button>
          </div>
        )}
      </IfAuthenticated>
      {navOpened && (
        <button className="fixed top-10 right-10" onClick={toggleMenu}>
          <i className="fa-solid fa-times text-3xl transition ease-in-out focus:-rotate-45 duration-300 absolute top-0 right-0 h-10 w-10"></i>
        </button>
      )}

      <nav
        className={`text-orange fixed right-20 top-15 h-0  backdrop-filter backdrop-blur-md bg-opacity-5 shadow-transparent transition-all ease-in-out duration-200 ${
          navOpened ? 'opacity-100' : 'hidden'
        }`}
      >
        <Nav toggleMenu={toggleMenu} />
      </nav>
    </div>
  )
}

export default Header
