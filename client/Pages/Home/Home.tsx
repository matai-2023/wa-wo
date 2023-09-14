import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from '../../components/Login/Login'
import { useNavigate } from 'react-router'
import { getUser } from '../../apis/api'
import { useQuery } from '@tanstack/react-query'

function Home() {
  const { getAccessTokenSilently } = useAuth0()
  //check user with useQuery see if they exist in our database
  const navigate = useNavigate()

  useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      const response = await getUser(accessToken)
      if (response?.nickname) navigate('/my-wardrobe')
      if (!response?.nickname) navigate('/profile')
    },
  })

  return (
    <>
      <LoginButton />
    </>
  )
}

export default Home
