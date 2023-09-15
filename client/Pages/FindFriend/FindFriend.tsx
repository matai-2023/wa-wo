import { useEffect, useState } from 'react'
import TextBox from '../../components/UI/TextBox/TextBox'
import { useAuth0 } from '@auth0/auth0-react'
import Button from '../../components/UI/Button/Button'
import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../../apis/api'
import { User } from '../../../types/User'
import { Link } from 'react-router-dom'

function FindFriends() {
  const [searchQ, setSearchQ] = useState('')
  const [friends, setFriends] = useState([] as User[])

  const { getAccessTokenSilently } = useAuth0()
  const { data } = useQuery({
    queryKey: ['users', friends],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      const data = await getAllUsers(token)
      return data
    },
  })

  async function handleClick() {
    const values = data?.filter((item) =>
      item.nickname.includes(searchQ)
    ) as User[]
    setFriends(values)
    setSearchQ('')
  }

  useEffect(() => {
    if (data) {
      const values = data?.filter((item) =>
        item.nickname.includes(searchQ)
      ) as User[]
      if (values?.length == 0) {
        setFriends([{ auth0_id: '', nickname: 'No friends found' }])
      } else {
        setFriends(values)
      }
      if (searchQ == '') setFriends([])
    }
  }, [searchQ])

  async function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleClick()
  }

  return (
    <>
      <div className="flex justify-center mt-[100px]">
        <div className=" w-[600px] h-[450px] border-8 border-orange rounded-xl">
          <div className="flex flex-col items-center">
            <TextBox
              className="mt-[50px]"
              value={searchQ}
              onKeyDown={handleKeyDown}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Enter a nickname"
            />
            <Button onClick={handleClick}>Find</Button>
            {friends.length !== 0 && (
              <div>
                <div
                  data-testid="friendList"
                  className="flex flex-col justify-center items-center mt-6 border-2 border-orange p-4"
                >
                  {friends &&
                    friends?.map((item) => (
                      <li key={item.auth0_id} className="list-none ">
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
    </>
  )
}

export default FindFriends
