import useComments from './commentHook'

interface Props {
  outfitId: number
}
export default function Comment(props: Props) {
  const commentHook = useComments(props.outfitId)
  const commentsList = commentHook.data
  console.log('Comment for:', props.outfitId, 'List: ', commentsList)
  return (
    <>
      <div className="p-4">
        {commentsList &&
          commentsList.map((item: any) => (
            <li
              className="flex flex-col xl:flex xl:flex-row xl:items-center"
              key={item.commentId}
            >
              <p className="text-lg font-semibold italic mr-4">
                {item.nickname}
              </p>{' '}
              <p>"{item.comment}"</p>
            </li>
          ))}
      </div>
    </>
  )
}
