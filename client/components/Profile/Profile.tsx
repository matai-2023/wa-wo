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
    <div className='flex justify-center'>
      <div className="flex flex-col w-[300px] md:w-[600px] justify-center p-12 mt-[50px] border-8 border-orange items-center rounded-xl">
        <div className="md:flex md:flex-row md:justify-center flex flex-col items-center mb-12 items-center">
          <label className=" md:text-3xl mr-4 text-2xl mb-4 md:mb-0">Nickname:</label>
          <input
            className="text-black border-2 h-[60px] w-[200px] md:w-[300px] rounded-md p-4 text-2xl outline-orange"
            placeholder="eg.Oops"
            autoFocus={true}
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
