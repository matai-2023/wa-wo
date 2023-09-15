import { useQuery, useQueryErrorResetBoundary } from '@tanstack/react-query'
import { getFriendsWardrobe } from '../../apis/api'
import { useAuth0 } from '@auth0/auth0-react'
import { useParams } from 'react-router-dom'
function useFriendsWardrobeHook(filter: string) {
  const { id } = useParams()
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0()
  const { data, isLoading } = useQuery({
    queryKey: ['wardrobe', filter],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      const response = await getFriendsWardrobe(id as string, accessToken)
      const name = response.nickname
      const filteredRobes =
        filter == ''
          ? response.robes
          : response.robes.filter((item: any) => item.category == filter)
      return { nickname: name, robes: filteredRobes }
    },
  })

  return {
    user,
    getAccessTokenSilently,
    isAuthenticated,
    data,
    isLoading,
  }
}

export default useFriendsWardrobeHook
