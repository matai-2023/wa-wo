import { useState } from 'react'
import useComments from './commentHook'
import { useAuth0 } from '@auth0/auth0-react'
import { AiFillMessage } from 'react-icons/ai'
import useUser from '../../hooks/useUser'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  outfitId: number
}
export default function CommentForm(props: Props) {
  const { getAccessTokenSilently } = useAuth0()
  //Check if user is in the server database-------------------
  const currentUser = useUser()
  const nickname = currentUser.data?.nickname
  const isRegistered = nickname ? true : false

  //-----------------------------------------------
  //-----------------------------------------------
  //State for showing the comment bar--------------
  //-----------------------------------------------
  //-----------------------------------------------
  const [showing, setShowing] = useState(true)
  //-----------------------------------------------
  //-----------------------------------------------
  //State to handle the input change in comment bar
  //-----------------------------------------------
  //-----------------------------------------------
  const [input, setInput] = useState('')
  //-----------------------------------------------
  //-----------------------------------------------
  //custom hook to handle adding comment
  //-----------------------------------------------
  //-----------------------------------------------
  const customMutation = useComments(props.outfitId)
  const mutationAdd = customMutation.commentAddMutation
  //-----------------------------------------------
  //-----------------------------------------------
  //Function to handle adding comments into database
  //-----------------------------------------------
  //-----------------------------------------------
  async function handleClick() {
    const token = await getAccessTokenSilently()
    mutationAdd.mutate({
      comment: input,
      outfitId: props.outfitId,
      token: token,
    })
    setShowing(!showing)
  }

  //-----------------------------------------------
  //-----------------------------------------------
  //Rendering--------------------------------------
  //-----------------------------------------------
  //-----------------------------------------------
  return (
    <>
      <button
        className="text-2xl hover:text-3xl hover:text-blue-400 transition-all"
        onClick={() => setShowing(!showing)}
      >
        {showing && isRegistered && <AiFillMessage />}
      </button>
      {!showing && (
        <div className="flex w-full justify-between items-center">
          <input
            type="text"
            className="border-2 border-orange w-full rounded-md text-md  px-2 lg:p-2 m-2"
            value={input}
            placeholder="Comment here"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="inline-flex mr-4 items-center -center h-[20px] px-4 py-0 text-sm lg:text-lg lg:h-[40px] font-semibold text-center text-orange no-underline align-middle transition-all duration-300 ease-in-out bg-transparent border-2 border-orange border-solid rounded-lg cursor-pointer select-none hover:text-white hover:bg-orange hover:border-white focus:shadow-xs focus:no-underline"
            onClick={handleClick}
          >
            Add
          </button>
        </div>
      )}
    </>
  )
}
