import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from '../../components/Login/Login'
import { useNavigate } from 'react-router'
import { getUser } from '../../apis/api'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'

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
      <div className="flex flex-row justify-evenly mt-[100px]">
        <div className=" box-border rounded-md w-[400px] h-[500px] flex items-center  bg-orange space">
          <img src="home2.png" alt="home logo" />
        </div>
        <div className="flex items-center space-y-50">
          <LoginButton />
        </div>
      </div>
    </>
  )
}

export default Home
