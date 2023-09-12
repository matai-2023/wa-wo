import { useAuth0 } from '@auth0/auth0-react'

function SignIn() {
  const { loginWithRedirect } = useAuth0()

  function handleSignIn() {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/my-wardrobe`,
      },
    })
    console.log('Sign in button')
  }

  return <button onClick={handleSignIn}>Sign In</button>
}

export default SignIn
