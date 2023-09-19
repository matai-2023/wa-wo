import { useAuth0 } from '@auth0/auth0-react'
import useComments from './commentHook'
import { RxCross2 } from 'react-icons/rx'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '../../apis/api'

interface Props {
  outfitId: number
}
export default function Comment(props: Props) {
  const commentHook = useComments(props.outfitId)
  const { getAccessTokenSilently, user } = useAuth0()
  const commentsList = commentHook.data
  const delComment = commentHook.commentDelMutation
  //-----------------------------------------------
  //-----------------------------------------------

  const userId = user?.sub
  //-----------------------------------------------
  //-----------------------------------------------
  //-----------------------------------------------
  async function handleDelete(commentId: number) {
    const token = await getAccessTokenSilently()
    delComment.mutate({ id: commentId, token: token })
  }
  return (
    <>
      <div className="p-4 w-full ">
        {commentsList &&
          commentsList.map((item: any) => (
            <li
              className="flex flex-col  xl:flex  xl:flex-row xl:items-center"
              key={item.commentId}
            >
              <p className="text-lg font-semibold italic mr-4">
                {item.nickname}
              </p>{' '}
              <div className="w-full flex justify-between">
                <p>{`"${item.comment}"`}</p>
                {userId == item.userId && (
                  <button
                    className="text-sm font-semibold  hover:scale-150 hover:text-red-400"
                    onClick={() => handleDelete(item.commentId)}
                  >
                    <RxCross2 />
                  </button>
                )}
              </div>
            </li>
          ))}
      </div>
    </>
  )
}
