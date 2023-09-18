import { useState } from 'react'
import useComments from './commentHook'
import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  outfitId: number
  showing: boolean
  handleClick: React.Dispatch<React.SetStateAction<boolean>>
}
export default function CommentForm(props: Props) {
  const { getAccessTokenSilently } = useAuth0()
  const [input, setInput] = useState('')
  const customMutation = useComments(props.outfitId)
  const mutationAdd = customMutation.commentAddMutation
  async function handleClick() {
    const token = await getAccessTokenSilently()
    mutationAdd.mutate({
      comment: input,
      outfitId: props.outfitId,
      token: token,
    })
    props.handleClick(!props.showing)
  }
  return (
    <>
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
    </>
  )
}
