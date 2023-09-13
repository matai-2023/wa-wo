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
    <div className='flex flex-col justify-center mt-20 border-8 border-orange items-center m-80 h-[32rem] rounded-xl'>
      <div className='flex flex-col items-center'>
      <label className='text-orange text-3xl mb-4 '>
        Nickname: 
        </label>
        <input
         className='text-black mb-20 p-4 text-2xl outline-orange'
          placeholder="   insert your nickname"
          autoFocus={true}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      
        </div>
      <Button onClick={handleSubmit}>Add Profile</Button>
    </div>
    </>
  )
}

export default RegisterForm