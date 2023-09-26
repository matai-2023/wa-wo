import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { delItem, getMyWardrobe } from '../../apis/api'
import { useAuth0 } from '@auth0/auth0-react'
function useMyWardrobeHook(filter: string) {
  const queryClient = useQueryClient()

  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0()

  const { data, isLoading } = useQuery({
    queryKey: ['wardrobe', filter],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      const response = await getMyWardrobe(accessToken)
      const filtered =
        filter == '' || filter == 'all'
          ? response
          : response.filter((item) => item.category == filter)

      return filtered
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
