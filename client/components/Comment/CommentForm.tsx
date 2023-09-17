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
      <input
        type="text"
        value={input}
        placeholder="Comment here"
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleClick}>Add comment</button>
    </>
  )
}
