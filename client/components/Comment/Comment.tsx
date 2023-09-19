import { useAuth0 } from '@auth0/auth0-react'
import useComments from './commentHook'

interface Props {
  user_id: string
  outfitId: number
}
export default function Comment(props: Props) {
  const commentHook = useComments(props.outfitId)
  const { getAccessTokenSilently } = useAuth0()
  const commentsList = commentHook.data
  const delComment = commentHook.commentDelMutation

  async function handleDelete(commentId: number) {
    const token = await getAccessTokenSilently()
    delComment.mutate({ id: commentId, token: token })
  }
  return (
    <>
      <div className="p-4 w-full">
        {commentsList &&
          commentsList.map((item: any) => (
            <li
              className="flex flex-col xl:flex xl:flex-row xl:items-center"
              key={item.commentId}
            >
              <p className="text-lg font-semibold italic mr-4">
                {item.nickname}
              </p>{' '}
              <p>{item.comment}</p>
              {props.user_id == item.userId && (
                <button onClick={() => handleDelete(item.commentId)}>
                  delete
                </button>
              )}
            </li>
          ))}
      </div>
    </>
  )
}
