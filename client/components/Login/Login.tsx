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