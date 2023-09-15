import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addItem } from '../apis/api'
import { AddWardrobe } from '../../types/MyWardrobe'

export default function useAddItem() {
  const queryClient = useQueryClient()

  const mutationAdd = useMutation({
    mutationFn: ({ newItem, token }: { newItem: AddWardrobe; token: string }) =>
      addItem(newItem, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['wardrobe'])
    },
  })

  return mutationAdd
}
