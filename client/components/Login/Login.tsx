import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from '../../apis/Authenticated'
import Button from '../UI/Button/Button'
function LoginButton() {
  const { user, logout, loginWithRedirect } = useAuth0()

  function handleLogin() {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/my-wardrobe`,
      },
    })
  }

  const handleSignOut = () => {
    logout()
  }

  return (
    <>
      <IfAuthenticated>
        <Button onClick={handleSignOut}>Log Out</Button>
        {user && <p>Signed in as: {user?.nickname}</p>}
      </IfAuthenticated>
      <IfNotAuthenticated>
        <Button onClick={handleLogin}>Log In</Button>
      </IfNotAuthenticated>
    </>
  )
}

export default LoginButton
