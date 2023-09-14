import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from '../../components/Login/Login'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

function Home() {
  const { user, isAuthenticated } = useAuth0()
  //check user with useQuery see if they exist in our database
  const navigate = useNavigate()
  useEffect(() => {
  //if user is in database navigate to /your-route
  //if not navigate to /profile
  }, [])
  return (
    <>
      <LoginButton />
    </>
  )
}

export default Home
