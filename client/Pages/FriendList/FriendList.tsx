import useFriendList from '../../hooks/useFriendList'
import { Link } from 'react-router-dom'
import { AiFillHeart } from 'react-icons/ai'
import Icon from '../../components/UI/Icon/Icon'
import { useAuth0 } from '@auth0/auth0-react'
import { useQueryClient } from '@tanstack/react-query'
import { delFriend } from '../../apis/api'
function FriendList() {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  //---------------------------------------------------------
  //Getting all Friends with api call------------------------
  //---------------------------------------------------------
  const customHook = useFriendList()
  const data = customHook.data
  //---------------------------------------------------------
  //Rendering------------------------------------------------
  //---------------------------------------------------------

  async function handleDeleteFriend(friendId: string) {
    const token = await getAccessTokenSilently()
    await delFriend(friendId, token)
    queryClient.invalidateQueries(['FriendList'])
  }

  return (
    <>
      <h1 className="flex  justify-center font-bold text-[23px] md:text-[30px] mb-10 mt-[100px]">
        My friends
      </h1>
      <div className="flex mb-[20px] justify-center">
        <div className="flex w-[300px] lg:w-[600px] border-8 border-orange pt-10 pb-10 h-auto rounded-lg flex-col items-center justify-center">
          <div className="flex flex-col justify-center text-orange">
            <ul className="m-4">
              {data &&
                data.length > 0 &&
                data?.map((friend: any) => (
                  <li
                    key={friend.nickname}
                    className="list-none w-auto flex flex-col items-center text-md lg:text-xl text-blue-300 mb-6 hover:text-orange hover:text-2xl border-2 p-2 rounded-lg"
                  >
                    <div className="flex flex-row relative w-[250px] lg:w-[400px] justify-center">
                      <div className="flex flex-col items-center">
                        <div className="text-red-700 mr-4 ">
                          <AiFillHeart />
                        </div>

                        <Link to={`/friend/${friend.auth0_id}`}>
                          <h3>{friend.nickname}</h3>
                        </Link>
                      </div>
                      <button
                        className="absolute top-3 right-0"
                        onClick={() => handleDeleteFriend(friend.auth0_id)}
                      >
                        <Icon className="bg-warning dark:text-white text-sm lg:text-xl">
                          <i className="fa-solid fa-trash" />
                        </Icon>
                      </button>
                    </div>
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
