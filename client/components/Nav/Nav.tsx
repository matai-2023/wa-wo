import { useNavigate } from 'react-router-dom'


interface Props {
  toggleMenu: () => void
}

function Nav(props: Props) {
 
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
          <button onClick={() => goTo('/my-songs')}>My wardrobe</button>
        </li>
        <li>
          <button onClick={() => goTo('/my-friends')}>My friends</button>
        </li>
        <li>
          <button onClick={() => goTo('/profile')}>Add an Item</button>
        </li>
        <li>
          <button onClick={() => goTo('/scan')}>Add a friend</button>
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
