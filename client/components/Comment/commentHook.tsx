import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import {
  addAComments,
  getCommentsOfOutfit,
  deleteAComment,
} from '../../apis/api'

function useComments(outfitId: number) {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['comments', outfitId],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      const response = await getCommentsOfOutfit(outfitId, accessToken)
      return response
    },
  })

  const commentAddMutation = useMutation({
    mutationFn: ({
      comment,
      outfitId,
      token,
    }: {
      comment: string
      outfitId: number
      token: string
    }) => addAComments({ comment, outfitId, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments'])
    },
  })

  const commentDelMutation = useMutation({
    mutationFn: ({ id, token }: { id: number; token: string }) =>
      deleteAComment(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments'])
    },
  })

  return { data, commentAddMutation, commentDelMutation }
}

export default useComments
