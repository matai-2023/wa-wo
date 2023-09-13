import useFriendList from '../../hooks/useFriendList'

function FriendList() {
  const customHook = useFriendList()
  // const data = customHook.data
  const data = [
    {
      nickname: 'bob312312312312312312321312312',
    },
    {
      nickname: 'bob123123123123123123213123123',
    },
    {
      nickname: 'bob312321321312312312312312312321321',
    },
  ]

  return (
    <>
      <div className="space-y-4 flex justify-center items-center mt-12">
        <div className=" flex flex-col">
          <h1 className=" flex items-center justify-center space-y-4 text-3xl font-semibold mb-10">
            My friends
          </h1>

          <div className="flex flex-col flex-auto text-orange text-2xl">
            <ul className="ml-8 mb-8">
              {data &&
                data.length > 0 &&
                data?.map((friend) => (
                  <li
                    key={friend.nickname}
                    className="list-none space-y-4 py-3 flex"
                  >
                    <h3>{friend.nickname}</h3>
                  </li>
                ))}
              {data?.length == 0 && (
                <li>
                  <h3>Sorry you aint got no friend</h3>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default FriendList
