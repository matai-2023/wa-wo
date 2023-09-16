import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { addProfile } from '../apis/api'

export default function useProfileHook() {
  const queryClient = useQueryClient()

  const profileMutation = useMutation({
    mutationFn: ({ nickname, token }: { nickname: string; token: string }) =>
      addProfile({ nickname: nickname, token: token }),
    onSuccess: () => {
      queryClient.invalidateQueries(['user'])
    },
  })

  return { profileMutation }
}
