import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { delItem, getMyWardrobe } from '../../apis/api'
import { useAuth0 } from '@auth0/auth0-react'
function useMyWardrobeHook() {
  const queryClient = useQueryClient()

  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0()

  const { data, isLoading } = useQuery({
    queryKey: ['wardrobe'],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()

      if (user && user.sub) {
        const response = await getMyWardrobe(accessToken)
        return response
      }
    },
  })

  const mutationDel = useMutation({
    mutationFn: ({ id, token }: { id: number; token: string }) =>
      delItem(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['wardrobe'])
    },
  })

  return {
    user,
    getAccessTokenSilently,
    isAuthenticated,
    data,
    isLoading,
    mutationDel,
  }
}

export default useMyWardrobeHook
