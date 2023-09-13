import useFriendList from '../../hooks/useFriendList'

function FriendList() {
  const customHook = useFriendList()
  // const data = customHook.data

  const data = [
    {
      nickname: 'bob111111111111111111',
    },
    {
      nickname: 'bob11111111111',
    },
    {
      nickname: 'bob1111111111111',
    },
    {
      nickname: 'bob1111111111',
    },
  ]
  return (
    <>
      <div className="space-y-4 flex justify-center items-center mt-12">
        <h1 className="space-y-4 text-xl font-semibold mb-10">My friends</h1>
        <ul className="space-y-4 mt-12 gap-5 text-orange">
          {data &&
            data?.map((friend) => (
              <li key={friend.nickname} className="gap-10">
                <h3>{friend.nickname}</h3>
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default FriendList
