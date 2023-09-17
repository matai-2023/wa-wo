import { useQuery } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { getOutfits } from '../../apis/api'

function useOutfit() {
  const { getAccessTokenSilently } = useAuth0()

  const { data } = useQuery({
    queryKey: ['outfits'],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      const response = await getOutfits(accessToken)
      return response
    },
  })
  return { data }
}

export default useOutfit
