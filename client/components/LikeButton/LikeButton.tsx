import { useState } from 'react'
import useLike from './useLikeHook'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useAuth0 } from '@auth0/auth0-react'
interface Props {
  outfitId: number
}
export default function LikeButton(props: Props) {
  const { getAccessTokenSilently } = useAuth0()
  const isLike = useLike(props.outfitId)
  const currentLike = isLike.data
  const mutationLike = isLike.mutationAddLike
  const mutationUnlike = isLike.mutationRemoveLike

  async function handleLike() {
    const token = await getAccessTokenSilently()
    mutationLike.mutate({ outfitId: props.outfitId, token: token })
  }

  async function handleUnLike() {
    const token = await getAccessTokenSilently()
    mutationUnlike.mutate({ outfitId: props.outfitId, token: token })
  }

  return (
    <div className="m-2 cursor-pointer hover:text-3xl">
      {currentLike && currentLike.check === false && (
        <AiOutlineHeart onClick={handleLike} />
      )}
      {currentLike && currentLike.check === true && (
        <AiFillHeart onClick={handleUnLike} />
      )}
    </div>
  )
}
