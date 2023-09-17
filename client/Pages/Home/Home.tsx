import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from '../../components/Login/Login'
import { useNavigate } from 'react-router'
import { getUser } from '../../apis/api'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import Title from '../../components/Title/Title'
import { GiDuration } from 'react-icons/gi'
function Home() {
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()

  //Check user with useQuery see if they exist in our database
  //Redirect them to the right place
  useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      const response = await getUser(accessToken)
      if (response?.nickname) navigate('/my-wardrobe')
      if (!response?.nickname) navigate('/profile')
      return []
    },
  })

  return (
    <>
      <div className="flex flex-row h-screen">
        <div
          className="bg-orange w-1/2 h-screen
         flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <img
              src="home2.png"
              alt="home logo"
              className="w-[500px] h-[500px]"
            />
          </motion.div>
        </div>

        <div className=" w-1/2 flex flex-col items-center justify-evenly">
          <div className="lg:text-[55px] text-orange text-[40px] top-2] ">
            <h5 className="mb-0 space-y-0">WARDROBE WONDERS</h5>
          </div>
          <div className="mt-0">
            <LoginButton />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
