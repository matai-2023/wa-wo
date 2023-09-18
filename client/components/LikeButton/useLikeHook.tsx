import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { addLike, checkLike, getAllOutfits, removeLike } from '../../apis/api'

function useLike(outfitId: number) {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['likes', outfitId],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      const response = await checkLike(outfitId, accessToken)
      return response
    },
  })

  const mutationAddLike = useMutation({
    mutationFn: ({ outfitId, token }: { outfitId: number; token: string }) =>
      addLike({ outfitId, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(['likes'])
    },
  })

  const mutationRemoveLike = useMutation({
    mutationFn: ({ outfitId, token }: { outfitId: number; token: string }) =>
      removeLike({ outfitId, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(['likes'])
    },
  })
  return { data, mutationAddLike, mutationRemoveLike }
}

export default useLike
