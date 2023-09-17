import useComments from './commentHook'

interface Props {
  outfitId: number
}
export default function Comment(props: Props) {
  const commentHook = useComments(props.outfitId)
  const commentsList = commentHook.data
  console.log(commentsList)
  return (
    <>
      <div>
        {commentsList &&
          commentsList.map((item: any) => (
            <li key={item.commentId}>
              <strong>{item.nickname}</strong> {item.comment}
            </li>
          ))}
      </div>
    </>
  )
}
