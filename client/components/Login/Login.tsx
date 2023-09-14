import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from '../../apis/Authenticated'
import Button from '../UI/Button/Button'
function LoginButton() {
  const { user, logout, loginWithRedirect } = useAuth0()

  function handleLogin() {
    loginWithRedirect({
      appState: { targetUrl: '/my-wardrobe' },
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
      </IfAuthenticated>
      <div>
        <IfNotAuthenticated>
          <Button onClick={handleLogin}>Log In</Button>
        </IfNotAuthenticated>
      </div>
    </>
  )
}

export default LoginButton
