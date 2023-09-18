import useFriendList from '../../hooks/useFriendList'
import useOutfit from './useCommentHook'
import Comments from '../../components/Comment/Comment'
import CommentForm from '../../components/Comment/CommentForm'
import { useState } from 'react'
import { AiFillHeart, AiOutlineHeart, AiFillMessage } from 'react-icons/ai'
import { BiSolidTShirt } from 'react-icons/bi'

export default function Outfit() {
  const [showing, setShowing] = useState(false)
  const [filter, setFilter] = useState('')
  const customFriendList = useFriendList()
  const friendList = customFriendList.data
  const customOutfitList = useOutfit(filter)
  const outfitList = customOutfitList.data
  return (
    <>
      <div className="flex md:justify-between  mt-32 mb-16 mr-16 ml-16  text-4xl border-b-[5px] w-10/12">
        <h1 className="italic text-2xl left-[100px] lg:text-[40px]">
          What are you wearing???
        </h1>
      </div>
      <div className="flex  w-10/12">
        <div className="sticky">
          <div
            className="overflow-auto sticky w-auto lg:w-[300px] h-[700px] top-[40px]  flex flex-col items-center  top-[300px] border-r-2 text-md lg:text-xl mb-[20px] "
            id="FRIENDLIST"
          >
            <button
              className="m-6 hover:max-w-full transition-all duration-500 h-0.5 focus:text-blue-400 hover:text-blue-400"
              onClick={() => setFilter('')}
            >
              ALL
            </button>
            {friendList &&
              friendList.map((item) => (
                <button
                  className="m-6 hover:max-w-full transition-all uppercase duration-500 h-0.5 focus:text-blue-400 hover:text-blue-400"
                  key={item.auth0_id}
                  onClick={() => setFilter(item.auth0_id)}
                >
                  {item.nickname}
                </button>
              ))}
          </div>
        </div>
        <div className="flex flex-col h-100vh ">
          <div className="flex flex-col w-auto ">
            <div className="flex flex-col ml-[40px]">
              {outfitList &&
                outfitList.map((item: any) => (
                  <div
                    className="flex flex-col h-full border-2 border-black m-2 lg:h-auto items-center lg:flex lg:flex-row "
                    key={item.id}
                  >
                    <div className=" w-full h-auto lg:h-[700px] m-4 lg:w-3/5 ">
                      <div className="">
                        <img
                          className="object-cover shadow-2xl"
                          src={item.img}
                        />
                      </div>
                      <div className="flex mt-6 ml-4 mb-4">
                        <button
                          className="text-2xl hover:text-3xl hover:text-blue-400 transition-all"
                          onClick={() => setShowing(!showing)}
                        >
                          {showing ? '' : <AiFillMessage />}
                        </button>
                        {showing && (
                          <CommentForm
                            outfitId={item.id}
                            showing={showing}
                            handleClick={setShowing}
                          />
                        )}
                      </div>
                      {!showing && (
                        <div className="border-2  rounded-md list-none pl-4 h-[250px] sm:h-[230px] md:h-[120px]  lg:h-[260px] xl:h-[120px] overflow-auto">
                          <Comments outfitId={item.id} />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col border-6 h-auto lg:h-[700px] w-full  lg:w-2/5 border-orange">
                      <div className=" uppercase lg:mt-10  p-2 flex flex-col lg:h-2/5">
                        <div className=" flex flex-row items-center lg:flex-col lg:items-start xl:flex xl:flex-row xl:items-center">
                          <p className="text-md lg:text-lg text-orange font-semibold mr-4">
                            top:{' '}
                          </p>
                          <p className="text-sm lg:text-lg">{item.top}</p>
                        </div>
                        <div className=" flex flex-row items-center lg:flex-col lg:items-start xl:flex xl:flex-row xl:items-center">
                          <p className="text-md lg:text-lg text-orange font-semibold mr-4">
                            bottom:{' '}
                          </p>
                          <p className="text-sm lg:text-lg">{item.bottom}</p>
                        </div>
                        <div className=" flex flex-row items-center lg:flex-col lg:items-start xl:flex xl:flex-row xl:items-center">
                          <p className="text-md lg:text-lg text-orange font-semibold mr-4">
                            outer:{' '}
                          </p>
                          <p className="text-sm lg:text-lg">{item.outer}</p>
                        </div>
                        <div className=" flex flex-row items-center lg:flex-col lg:items-start xl:flex xl:flex-row xl:items-center">
                          <p className="text-md lg:text-lg text-orange font-semibold mr-4">
                            accessories:{' '}
                          </p>
                          <p className="text-sm lg:text-lg">
                            {item.accessories}
                          </p>
                        </div>
                        <div className=" flex flex-row items-center lg:flex-col lg:items-start xl:flex xl:flex-row xl:items-center">
                          <p className="text-md lg:text-lg font-semibold text-orange mr-4">
                            footer:{' '}
                          </p>
                          <p className="text-sm lg:text-lg">{item.footer}</p>
                        </div>
                      </div>
                      <div className="h-auto p-2">
                        <p className="uppercase font-semibold text-md lg:text-lg p-2">
                          description
                        </p>
                        <p className="text-sm lg:text-lg">{item.description}</p>
                      </div>
                      <div className="flex justify-center items-end text-2xl lg:h-1/5 ">
                        <div className="m-2 cursor-pointer hover:text-3xl">
                          <AiOutlineHeart />
                        </div>
                        <div className="m-2 cursor-pointer hover:text-3xl">
                          <AiFillHeart />
                        </div>
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
        <div>
          <h1>hello</h1>
        </div>
      </div>
    </>
  )
}
