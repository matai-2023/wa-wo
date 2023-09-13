import { useQuery } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { getFriendList } from '../apis/api'

function useFriendList() {
  const { getAccessTokenSilently } = useAuth0()

  const { data } = useQuery({
    queryKey: ['FriendList'],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      const response = await getFriendList(accessToken)
      return response
    },
  })
  return { data }
}

export default useFriendList
