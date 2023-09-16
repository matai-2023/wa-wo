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
      <div className="flex border-2 bg-orange m-16 pt-10 pb-20 h-auto rounded-lg flex-col items-center justify-center mt-12">
        <div>
          <h1 className="flex text-white justify-center text-3xl font-semibold mb-10">
            My friends
          </h1>

          <div className="flex flex-col border-2 flex-auto text-orange rounded-lg text-2xl bg-white">
            <ul className="m-4">
              {data &&
                data.length > 0 &&
                data?.map((friend: any) => (
                 
                  <li
                    key={friend.nickname}
                    className="text-orange list-none flex hover:text-3xl items-center hover:text-blue-400 hover:text-2xl"
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
