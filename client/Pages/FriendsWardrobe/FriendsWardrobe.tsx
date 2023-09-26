import { useAuth0 } from '@auth0/auth0-react'
import useFriendsWardrobeHook from './useFriendsWardrobeHook'
import { useEffect, useState } from 'react'
import FriendsWardrobeList from '../../components/FriendsWardrobeList/FriendsWardrobeList'
import { Wardrobe } from '../../../types/MyWardrobe'
import { addFriend } from '../../apis/api'
import useFriendList from '../../hooks/useFriendList'

function FriendsWardrobe() {
  const friendListHook = useFriendList()
  const friendList = friendListHook.data
  const [isFriend, setIsFriend] = useState(false)
  //--------------------------------------------------------
  //--------------------------------------------------------
  //setting up filter word----------------------------------
  //--------------------------------------------------------
  //--------------------------------------------------------

  const [filter, setFilter] = useState('')
  const { isAuthenticated } = useAuth0()
  const { data, isLoading, getAccessTokenSilently, id } =
    useFriendsWardrobeHook(filter)
  //--------------------------------------------------------
  //--------------------------------------------------------
  //Making typescript happy
  //--------------------------------------------------------
  //--------------------------------------------------------
  const friendId = id as string
  const nickname = data?.nickname
  const robes = data?.robes as Wardrobe[]
  //--------------------------------------------------------
  //--------------------------------------------------------
  //Checking friends
  //--------------------------------------------------------
  //--------------------------------------------------------
  function findFriends() {
    return friendList?.find((item) => item.auth0_id == id)
  }
  useEffect(() => {
    const isFriend = findFriends()
    if (isFriend) setIsFriend(true)
    if (!isFriend) setIsFriend(false)
  }, [])
  //--------------------------------------------------------
  //--------------------------------------------------------
  //Rendering
  //--------------------------------------------------------
  //--------------------------------------------------------
  async function handleClick() {
    const token = await getAccessTokenSilently()
    await addFriend(friendId, token)
    setIsFriend(true)
  }
  return (
    <>
      {' '}
      {isLoading && <div>Loading ...</div>}
      <div className="w-auto flex flex-col sm:flex-row  sm:mt-[100px]">
        <div className="h-[200px] sm:h-[700px] mb-[100px] relative sm:sticky top-[40px] flex flex-row flex-wrap sm:flex-col place-content-evenly sm:w-auto  sm:border-r-2 text-md lg:text-xl sm:mb-[20px]  ">
          <button
            className="m-6 hover:max-w-full hover:scale-125 ease-in duration-100  h-0.5 focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('')}
          >
            ALL
          </button>
          <button
            className="m-6 hover:max-w-full hover:scale-125 ease-in duration-100 h-0.5 focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('outer')}
          >
            OUTER
          </button>
          <button
            className="m-6 hover:max-w-full hover:scale-125 ease-in duration-100 h-0.5 focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('top')}
          >
            TOP
          </button>
          <button
            className="m-6 hover:max-w-full hover:scale-125 ease-in duration-100 h-0.5 focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('bottom')}
          >
            BOTTOM
          </button>
          <button
            className="m-6 hover:max-w-full hover:scale-125 ease-in duration-100 h-0.5 focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('footwear')}
          >
            FOOTWEAR
          </button>
          <button
            className="m-6 hover:max-w-full hover:scale-125 ease-in duration-100 h-0.5 focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('accessories')}
          >
            ACC
          </button>
        </div>
        <div className="w-screen">
          <div className="flex md:justify-between justify-evenly m-8 sm:mt-16 sm:mr-16 sm:ml-16 text-4xl border-b-[5px] w-10/12">
            {nickname && (
              <h1 className="italic text-2xl lg:text-[40px]">
                {nickname.nickname} Wardrobe
              </h1>
            )}
            {!isFriend && (
              <button
                onClick={handleClick}
                className=" hover:max-w-full transition-all  h-0.5 text-sm hover:scale-125 ease-in lg:text-[20px] hover:text-orange mb-2"
              >
                FRIEND
                <i className="fa-solid fa-plus text-sm lg:text-2xl"></i>
              </button>
            )}
          </div>

          {isAuthenticated && (
            <ul>
              <div className="ml-[50px] mr-[80px] cols-4  place-content-center">
                <div className="grid grid-cols-[300px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
                  {data &&
                    robes &&
                    robes.length > 0 &&
                    robes.map((item: any) => (
                      <li
                        className="list-none hover:scale-105 ease-in duration-200 shadow-2xl md:shrink:0 w-[250px] pb-4 cursor-pointer hover:border-2 hover:rounded-lg hover:border-orange border-b-2 border-black m-6 "
                        key={item.id}
                      >
                        <FriendsWardrobeList wardrobe={item} />
                      </li>
                    ))}
                  {data && robes && robes.length == 0 && (
                    <div className="w-[800px] h-[300px] flex justify-center items-center ">
                      <p data-testid="testid" className="text-2xl font-bold">
                        Wardrobe is empty!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default FriendsWardrobe
