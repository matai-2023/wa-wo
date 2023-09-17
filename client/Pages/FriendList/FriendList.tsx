import useFriendList from '../../hooks/useFriendList'
import { Link } from 'react-router-dom'
import {AiFillHeart} from 'react-icons/ai'
function FriendList() {
  //---------------------------------------------------------
  //Getting all Friends with api call------------------------
  //---------------------------------------------------------
  const customHook = useFriendList()
  const data = customHook.data
  //---------------------------------------------------------
  //Rendering------------------------------------------------
  //---------------------------------------------------------
  return (
    <>
          <h1 className="flex  justify-center font-bold text:[25px] md:text-[30px] mb-10">
            My friends
          </h1>
    <div className='flex mb-[20px] justify-center'>
      <div className="flex w-[300px] md:w-[600px] border-4 border-orange pt-10 pb-10 h-auto rounded-lg flex-col items-center justify-center">

          <div className="flex flex-col justify-center text-orange">
            <ul className="m-4">
              {data &&
                data.length > 0 &&
                data?.map((friend: any) => (
                 
                  <li
                    key={friend.nickname}
                    className="list-none flex flex-col items-center text-xl text-blue-300 mb-6 hover:text-orange hover:text-2xl border-2 p-2 rounded-lg"
                  > 
                  <div className='text-red-700 mr-4 '>
                  <AiFillHeart/>
                </div>
                    <Link to={`/friend/${friend.auth0_id}`}>
                      <h3>{friend.nickname}</h3>
                    </Link>
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
