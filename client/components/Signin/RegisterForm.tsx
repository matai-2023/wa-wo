import { useState } from 'react'
import Button from '../UI/Button/Button'
import profileHook from '../../ProfileHook/ProfileHook'
import { useAuth0 } from '@auth0/auth0-react'
// eslint-disable-next-line no-unused-vars
function RegisterForm() {
  const [input, setInput] = useState('')
  //setting up custom hook
  const useHooks = profileHook()
  const { getAccessTokenSilently } = useAuth0()

  //handling all keydown && Enter keypress
  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
   e.preventDefault()
   const token = await getAccessTokenSilently()
   useHooks.profileMutation.mutate({nickname:input, token})
   setInput('')
  }

  return (
    <>
    <div className=''>
      <label className='text-orange'>
        Nickname: 
        <input
         className='text-black'
          placeholder="Insert your Nickname"
          autoFocus={true}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </label>
      <Button onClick={handleSubmit}>Add Profile</Button>
    </div>
    </>
  )
}

export default RegisterForm