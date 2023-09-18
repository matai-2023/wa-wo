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
      newOutfit: OutfitToAdd
      token: string
    }) => addOutfit(newOutfit, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['outfits'])
    },
  })

  return { mutationAddOutfit }
}
