import { useQuery } from '@tanstack/react-query'
import { getFriendList } from '../../apis/api'
import { useAuth0 } from '@auth0/auth0-react'

function FriendList() {
  const { user, getAccessTokenSilently } = useAuth0()
  const { data } = useQuery({
    queryKey: ['FriendList'],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      const response = await getFriendList(accessToken)
      return response
    },
  })
  console.log(data)
  console.log(user)

  return (
    <>
      <div className="space-y-4 flex justify-center items-center mt-12">
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
