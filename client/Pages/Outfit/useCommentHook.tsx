import { useQuery } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { getAllOutfits } from '../../apis/api'

function useOutfit(filter: string) {
  const { getAccessTokenSilently } = useAuth0()

  const { data } = useQuery({
    queryKey: ['outfits', filter],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      const response = await getAllOutfits(accessToken)

      const filtered =
        filter == ''
          ? response
          : response.filter((item: any) => item.user_id == filter)

      return filtered
    },
  })
  return { data }
}

export default useOutfit
