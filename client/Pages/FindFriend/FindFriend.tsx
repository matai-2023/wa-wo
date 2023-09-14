import { useState } from 'react'
import TextBox from '../../components/UI/TextBox/TextBox'
import { useAuth0 } from '@auth0/auth0-react'
import Button from '../../components/UI/Button/Button'
import Icon from '../../components/UI/Icon/Icon'
import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../../apis/api'
import { User } from '../../../types/User'

function FindFriends() {
  const [searchQ, setSearchQ] = useState('')
  const [friends, setFriends] = useState([] as User[])
  // const [showing, setShowing] = useState(false)
  // const [suggestions, setSuggestions] = useState([])
  const { getAccessTokenSilently } = useAuth0()

  async function handleClick() {
    const token = await getAccessTokenSilently()
    const data = await getAllUsers(token)
    console.log(data)
    const values = data.filter((item) => item.nickname.includes(searchQ))
    setFriends(values)
    setSearchQ('')
  }

  // async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   setShowing(true)
  //   setSearchQ(e.target.value)
  //   const token = await getAccessTokenSilently()
  //   const data = await searchFriends(searchQ, token)
  //   setSuggestions(data)
  //   if (e.target.value.length == 0) {
  //     setSuggestions([])
  //     setShowing(false)
  //   }
  // }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleClick()
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center mt-20 border-8 border-orange items-center m-80 h-[32rem] rounded-xl">
        <div className="flex flex-col items-center">
          <TextBox
            value={searchQ}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchQ(e.target.value)}
            placeholder="Enter a nickname"
            autoFocus={true}
          />
          <Button onClick={handleClick}>Find</Button>
          <div className="flex flex-col justify-center items-center mt-10 border-2 border-orange p-4">
            {friends &&
              friends.length !== 0 &&
              friends?.map((item) => (
                <li key={item.nickname}>{item.nickname}</li>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default FindFriends
