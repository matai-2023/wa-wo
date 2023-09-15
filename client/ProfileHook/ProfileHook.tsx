import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { addProfile } from '../apis/api'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../apis/api'
export default function useProfileHook() {
  const navigate = useNavigate()
  const { user, getAccessTokenSilently } = useAuth0()

  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      if (user && user.sub) {
        const response = await getUser(accessToken)
        return response
      }
    },
  })

  const profileMutation = useMutation({
    mutationFn: ({ nickname, token }: { nickname: string; token: string }) =>
      addProfile({ nickname: nickname, token: token }),
    onSuccess: () => {
      queryClient.invalidateQueries(['user'])
      navigate('/my-wardrobe')
    },
  })

  return { profileMutation }
}
