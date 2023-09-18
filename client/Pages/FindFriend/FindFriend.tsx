import { useEffect, useState } from 'react'
import TextBox from '../../components/UI/TextBox/TextBox'
import { useAuth0 } from '@auth0/auth0-react'
import Button from '../../components/UI/Button/Button'
import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../../apis/api'
import { User } from '../../../types/User'
import { Link } from 'react-router-dom'

import { FaUserFriends } from 'react-icons/fa'
function FindFriends() {
  const { user, getAccessTokenSilently } = useAuth0()

  const currentUserAuth0Id = user?.name

  //---------------------------------------------------------
  //setting up search queries, friend list to render---------
  //---------------------------------------------------------
  const [searchQ, setSearchQ] = useState('')
  const [friends, setFriends] = useState([] as User[])
  //---------------------------------------------------------
  //Calling api to get all data at first---------------------
  //---------------------------------------------------------
  const { data } = useQuery({
    queryKey: ['users', friends],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      const data = await getAllUsers(token)
      return data
    },
  })

  //---------------------------------------------------------
  //Handle clicking button FIND
  //---------------------------------------------------------

  async function handleClick() {
    const values = data?.filter(
      (item) =>
        item.nickname.includes(searchQ) && item.nickname !== currentUserAuth0Id
    ) as User[]
    setFriends(values)
  }

  //--------------------------------------------------------------------------------
  //Keep the search queries and the views up to date for every input change---------
  //--------------------------------------------------------------------------------
  useEffect(() => {
    if (data) {
      const values = data?.filter(
        (item) =>
          item.nickname.includes(searchQ) &&
          item.nickname !== currentUserAuth0Id
      ) as User[]
      if (values?.length == 0) {
        setFriends([{ auth0_id: '', nickname: 'No friends found' }])
      } else {
        setFriends(values)
      }
      if (searchQ == '') setFriends([])
    }
  }, [searchQ])

  //---------------------------------------------------------
  //Handle input of key Enter to search----------------------
  //---------------------------------------------------------

  async function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleClick()
  }

  //---------------------------------------------------------
  //---------------------------------------------------------
  //Rendering-------------------------------------------------
  //---------------------------------------------------------
  //---------------------------------------------------------

  return (
    <>
      <div className="flex flex-col items-center mt-[100px]">
        <h2 className="font-bold text-[23px] md:text-[30px]">
          Search your friend
        </h2>
        <div className="flex justify-center mt-[50px]">
          <div className="w-[300px] md:w-[600px] h-auto border-8 border-orange rounded-xl">
            <div className="flex flex-col items-center pb-[20px]">
              <TextBox
                className="mt-[50px]  border-2 rounded-md"
                value={searchQ}
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="      Enter a nickname"
              />
              {/* <Button onClick={handleClick}>Find</Button> */}
              {friends.length !== 0 && (
                <div>
                  <div
                    data-testid="friendList"
                    className="flex flex-col justify-center items-center mt-6 "
                  >
                    {friends &&
                      friends?.map((item) => (
                        <li
                          key={item.auth0_id}
                          className="list-none flex flex-col items-center text-xl text-blue-300 mb-6 hover:text-orange hover:text-2xl border-2 p-2 rounded-lg"
                        >
                          <div className="text-black">
                            <FaUserFriends />
                          </div>
                          <Link to={`/friend/${item.auth0_id}`}>
                            <h3>{item.nickname}</h3>
                          </Link>
                        </li>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FindFriends
