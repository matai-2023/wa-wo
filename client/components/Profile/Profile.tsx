import { useState } from 'react'
import Button from '../UI/Button/Button'
import profileHook from '../../ProfileHook/ProfileHook'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
function ProfileForm() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  //setting up custom hook
  const useHooks = profileHook()
  const { getAccessTokenSilently } = useAuth0()

  //handling all keydown && Enter keypress
  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    const token = await getAccessTokenSilently()
    useHooks.profileMutation.mutate({ nickname: input, token })
    navigate('/my-wardrobe')
  }

  return (
    <>
    <div className='flex flex-col items-center justify-center'>
        <h2 className='font-bold text-[30px]'>Enter your nickname</h2>
      <div className="flex flex-col justify-center w-[800px] mt-10 border-8 border-orange items-center m-80 h-[32rem] rounded-xl">
        <div className="flex flex-col items-center">
          <label className="text-blue-300 text-3xl mb-4 ">Nickname:</label>
          <input
            className="text-black mb-20 p-4 border-2 rounded-lg text-2xl "
            placeholder="   insert your nickname"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <Button onClick={handleSubmit}>Add Profile</Button>
      </div>
      </div>
    </>
  )
}

export default ProfileForm
