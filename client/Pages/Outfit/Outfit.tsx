import useFriendList from '../../hooks/useFriendList'
import useOutfit from './useCommentHook'
import Comment from '../../components/Comment/Comment'
import CommentForm from '../../components/Comment/CommentForm'
import { useState } from 'react'
export default function Outfit() {
  const [showing, setShowing] = useState(false)
  const customFriendList = useFriendList()
  const friendList = customFriendList.data
  const customOutfitList = useOutfit()
  const outfitList = customOutfitList.data
  return (
    <>
      <div className="flex flex-col items-center" id="IMAGE&&COMMENTS">
        <h1 className="text-center">What am I wearing???</h1>
        <div>
          {outfitList &&
            outfitList.map((item: any) => (
              <div key={item.id}>
                <img
                  className="w-[70px] h-[70px]"
                  src={item.img}
                  key={item.id}
                />
                <button onClick={() => setShowing(!showing)}>
                  {showing ? '' : 'Comment'}
                </button>
                {showing && (
                  <CommentForm
                    outfitId={item.id}
                    showing={showing}
                    handleClick={setShowing}
                  />
                )}
                <Comment outfitId={item.id} />
              </div>
            ))}
        </div>

        <div>ICONS</div>
      </div>
      <div className="flex flex-col" id="FRIENDLIST">
        <h1>Friendlist</h1>
        {friendList &&
          friendList.map((item) => (
            <li key={item.auth0_id}>{item.nickname}</li>
          ))}
      </div>
    </>
  )
}
