function SignIn() {
  //   const { loginWithRedirect } = useAuth0()

  function handleSignIn() {
    // loginWithRedirect({
    //   authorizationParams: {
    //     redirect_uri: `${window.location.origin}/my-songs`,
    //   },
    // })
    console.log('Sign in button')
  }

  return <button onClick={handleSignIn}>Sign In</button>
}

export default SignIn
