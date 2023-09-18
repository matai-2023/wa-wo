import useFriendList from '../../hooks/useFriendList'
import useOutfit from './useCommentHook'
import Comment from '../../components/Comment/Comment'
import CommentForm from '../../components/Comment/CommentForm'
import { useState } from 'react'

import { BiSolidTShirt } from 'react-icons/bi'
import LikeButton from '../../components/LikeButton/LikeButton'
export default function Outfit() {
  const [showing, setShowing] = useState(false)
  const [filter, setFilter] = useState('')
  const customFriendList = useFriendList()
  const friendList = customFriendList.data
  const customOutfitList = useOutfit(filter)
  const outfitList = customOutfitList.data

  return (
    <>
      <div className="flex  justify-center border-2 border-pink-400 h-[50px] mt-[100px] ">
        <h1 className="text-center text-xl lg:text-3xl">
          What are you wearing???
        </h1>
      </div>
      <div>
        <div className="flex border-4 border-black">
          <div className="sticky">
            <div
              className="sticky h-auto top-[40px] flex flex-col justify-start w-auto top-[300px] border-black border-r-2 text-md lg:text-lg mb-[20px]"
              id="FRIENDLIST"
            >
              <h1>Friendlist</h1>
              <button className="m-4" onClick={() => setFilter('')}>
                ALL
              </button>
              {friendList &&
                friendList.map((item) => (
                  <button
                    className="m-4"
                    key={item.auth0_id}
                    onClick={() => setFilter(item.auth0_id)}
                  >
                    {item.nickname}
                  </button>
                ))}
            </div>
          </div>

          <div className="flex border-2">
            <div className="flex flex-col items-center  w-4/5 border-2 border-black">
              <div className="flex flex-col ml-[40px]">
                {outfitList &&
                  outfitList.map((item: any) => (
                    <div className="flex flex-row h-[700px]" key={item.id}>
                      <div className="w-[500px] h-[500px]">
                        <img
                          className="w-[70px] shadow-2xl border-2 w-full h-full border-red-400 h-[70px]"
                          src={item.img}
                        />
                        <div className="border-2  border-yellow-400">
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
                        </div>
                        <div className=" h-[150px] overflow-auto">
                          <Comment outfitId={item.id} />
                        </div>
                      </div>
                      <div className="flex flex-col border-2 w-2/5 ml-[40px] mr-[40px] border-orange">
                        <div className="border-2 border-green-400 flex flex-col justify-around h-[350px]">
                          <div className="border-2 border-red-400">
                            <p className="text-lg font-semibold">
                              top: {item.top}
                            </p>
                          </div>
                          <div className="border-2 border-black">
                            <p className="text-lg font-semibold">
                              bottom: {item.bottom}
                            </p>
                          </div>
                          <div className="border-2 border-blue-400">
                            <p className="text-lg font-semibold">
                              outer: {item.outer}
                            </p>
                          </div>
                        </div>
                        <div className="border-2 h-[350px] border-black">
                          <p className="text-lg font-semibold">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex justify-center items-center  text-2xl h-[200px] border-2 border-purple-400">
                          <LikeButton outfitId={item.id} />
                          <div className="m-2 cursor-pointer hover:text-3xl">
                            <BiSolidTShirt />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
