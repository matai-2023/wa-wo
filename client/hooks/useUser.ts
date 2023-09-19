import { useQuery } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { getUser } from '../apis/api'

function useUser() {
  const { getAccessTokenSilently } = useAuth0()

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      const response = await getUser(accessToken)
      return response
    },
  })
  return { data }
}

export default useUser
