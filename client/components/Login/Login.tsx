import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from '../../apis/Authenticated'

function LoginButton() {
  const { user, logout, loginWithRedirect } = useAuth0()

  function handleLogin() {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/my-wardrobe`,
      },
    })
    console.log('login button')
  }

  const handleSignOut = () => {
    logout()
  }

  return (
    <>
      <IfAuthenticated>
        <button onClick={handleSignOut}>Log Out</button>
        {user && <p>Signed in as: {user?.nickname}</p>}
      </IfAuthenticated>
      <IfNotAuthenticated>
        <button onClick={handleLogin}>Log In</button>
      </IfNotAuthenticated>
    </>
  )
}

export default LoginButton
