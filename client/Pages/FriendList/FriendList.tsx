import { useQuery } from '@tanstack/react-query'
import { getFriendList } from '../../apis/api'
import { useAuth0 } from '@auth0/auth0-react'

function FriendList() {
  const { user, getAccessTokenSilently } = useAuth0()
  const { data } = useQuery({
    queryKey: ['FriendList'],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      if (user && user.sub) {
        const response = await getFriendList(accessToken)
        return response
      }
    },
  })
  return (
    <>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">My friends</h1>
        <ul className="space-y-4">
          {data &&
            data?.map((friend) => (
              <li key={friend.auth0Id}>{friend.nickname}</li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default FriendList
