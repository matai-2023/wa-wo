import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addOutfit } from '../../apis/api'
import { OutfitToAdd } from '../../../server/db/outfits'

export default function useAddOutfit() {
  const queryClient = useQueryClient()

  const mutationAddOutfit = useMutation({
    mutationFn: ({
      newOutfit,
      token,
    }: {
      newOutfit: FormData
      token: string
    }) => addOutfit(newOutfit, token),
    onSuccess: () => {
      //Do not question this double invalidate!
      queryClient.invalidateQueries(['outfits'])
      queryClient.invalidateQueries(['outfits'])
    },
  })

  return { mutationAddOutfit }
}
