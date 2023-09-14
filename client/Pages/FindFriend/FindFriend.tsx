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
  console.log(searchQ)

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

  return (
    <>
      <TextBox
        value={searchQ}
        onChange={(e) => setSearchQ(e.target.value)}
        placeholder="Enter a nickname"
      />
      <button onClick={handleClick}>Find</button>

      {friends &&
        friends.length !== 0 &&
        friends?.map((item) => <li key={item.nickname}>{item.nickname}</li>)}
    </>
  )
}

export default FindFriends
