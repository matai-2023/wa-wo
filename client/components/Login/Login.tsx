import { useAuth0 } from '@auth0/auth0-react'

import Button from '../UI/Button'

function LoginButton() {
//   const { loginWithRedirect } = useAuth0()

  function handleLogin() {
    // loginWithRedirect({
    //   authorizationParams: {
    //     redirect_uri: `${window.location.origin}/my-songs`,
    //   },
    // })
    console.log('login button')
  }

  return (
    <button onClick={handleLogin}>Login</button>
  )
}

export default LoginButton