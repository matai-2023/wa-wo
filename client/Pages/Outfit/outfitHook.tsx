import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { deleteOutfit, getAllOutfits } from '../../apis/api'
import { useAuth0 } from '@auth0/auth0-react'

function useOutfits() {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['outfits'],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      const response = await getAllOutfits(accessToken)
      return response
    },
  })

  const outfitDelMutation = useMutation({
    mutationFn: ({ id, token }: { id: number; token: string }) =>
      deleteOutfit(id, token),
    onSuccess: () => {
      //Do not question this double invalidate
      queryClient.invalidateQueries(['outfits'])
      queryClient.invalidateQueries(['outfits'])
    },
  })

  return { data, outfitDelMutation }
}

export default useOutfits
