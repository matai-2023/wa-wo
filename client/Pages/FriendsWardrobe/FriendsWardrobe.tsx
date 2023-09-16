import { useAuth0 } from '@auth0/auth0-react'
import useFriendsWardrobeHook from './useFriendsWardrobeHook'
import { useState } from 'react'
import FriendsWardrobeList from '../../components/FriendsWardrobeList/FriendsWardrobeList'
import { Wardrobe } from '../../../types/MyWardrobe'
import { useNavigate } from 'react-router-dom'
import { addFriend } from '../../apis/api'

function FriendsWardrobe() {
  const navigate = useNavigate()
  //--------------------------------------------------------
  //--------------------------------------------------------
  //setting up filter word----------------------------------
  //--------------------------------------------------------
  //--------------------------------------------------------

  const [filter, setFilter] = useState('')
  const { isAuthenticated } = useAuth0()
  const { data, isLoading, getAccessTokenSilently, id} = useFriendsWardrobeHook(filter)
  //--------------------------------------------------------
  //--------------------------------------------------------
  //Making typescript happy
  //--------------------------------------------------------
  //--------------------------------------------------------
  const friendId= id
  const nickname = data?.nickname
  const robes = data?.robes as Wardrobe[]

  //--------------------------------------------------------
  //--------------------------------------------------------
  //Rendering
  //--------------------------------------------------------
  //--------------------------------------------------------
 async function handleClick(){
  const token = await getAccessTokenSilently()
  await addFriend(friendId, token)
  alert('added')
 }
  return (
    <>
      {' '}
        {isLoading && <div>Loading ...</div>}
        <div className=' flex'>
        <div className="h-[700px] sticky top-[40px] flex flex-col place-content-evenly w-[280px] top-[300px] border-r-2 text-2xl mb-[20px] ">
          <button
            className="m-6 hover:max-w-full transition-all duration-500 h-0.5 focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('')}
            >
            ALL
          </button>
          <button
            className="m-6 hover:max-w-full transition-all duration-500 h-0.5 focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('outer')}
            >
            OUTER
          </button>
          <button
            className="m-6 hover:max-w-full transition-all duration-500 h-0.5 focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('top')}
            >
            TOP
          </button>
          <button
            className="m-6 hover:max-w-full transition-all duration-500 h-0.5 focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('bottom')}
            >
            BOTTOM
          </button>
          <button
            className="m-6 hover:max-w-full transition-all duration-500 h-0.5 focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('footwear')}
            >
            FOOTWEAR
          </button>
          <button
            className="m-6 hover:max-w-full transition-all duration-500 h-0.5 focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('accessories')}
            >
            ACC
          </button>
        </div>
        <div>
        <div className='flex justify-between mb-16 mr-16 ml-16  text-4xl border-b-[5px] w-10/12'>
        {nickname&&<h1>{nickname.nickname} Wardrobe</h1>}
        <button onClick={() => handleClick()}
              className=" hover:max-w-full transition-all duration-500 h-0.5 text-2xl hover:text-blue-400 mb-2"
              >ADD
                <i className='fa-solid fa-plus text-2xl'></i>
              </button>
        </div>

      {isAuthenticated && (
        <ul>
          <div className="ml-[50px] mr-[80px] cols-4  place-content-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
              {data &&
                robes &&
                robes.length > 0 &&
                robes.map((item: any) => (
                  <li className="list-none cursor-pointer hover:border-2 hover:border-orange border-b-2 border-black m-6 " key={item.id}>
                    <FriendsWardrobeList
                      wardrobe={item}
                    />
                  </li>
                ))}
            </div>
          </div>
          {!data ||
            (robes && robes?.length == 0 && (
              <div className="flex flex-row h-[300px] justify-center items-center">
                <p data-testid="testid" className="text-2xl font-bold">
                  Wardrobe is empty!
                </p>
              </div>
            ))}
        </ul>
      )}
      </div>
      </div>
    </>
  )
}

export default FriendsWardrobe
