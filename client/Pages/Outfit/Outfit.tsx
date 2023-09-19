import useFriendList from '../../hooks/useFriendList'
import useOutfit from './useCommentHook'
import Comments from '../../components/Comment/Comment'
import CommentForm from '../../components/Comment/CommentForm'
import { useState } from 'react'

import { BiSolidTShirt } from 'react-icons/bi'

import LikeButton from '../../components/LikeButton/LikeButton'
export default function Outfit() {
  const [filter, setFilter] = useState('')
  const customFriendList = useFriendList()
  const friendList = customFriendList.data
  const customOutfitList = useOutfit(filter)
  const outfitList = customOutfitList.data

  return (
    <>
      <div className="flex md:justify-between justify-center  mt-32 mb-32 mr-16 ml-16  text-4xl ">
        <h1 className="italic text-2xl left-[100px] border-b-[5px] w-11/12 lg:text-[40px] mb-2">
          oOtd
        </h1>
      </div>
      <div className="flex w-screen">
        <div className="sticky">
          <div
            className="break-all overflow-y-auto sticky w-[150px] lg:w-[300px] h-[700px] top-[40px]  flex flex-col items-center  border-r-2 text-md lg:text-xl mb-[20px] "
            id="FRIENDLIST"
          >
            <button
              className="m-6 hover:max-w-full hover:scale-125 ease-in duration-100 h-0.5 focus:text-blue-400 hover:text-blue-400"
              onClick={() => setFilter('')}
            >
              ALL
            </button>
            {friendList &&
              friendList.map((item) => (
                <button
                  className="m-6 hover:max-w-full hover:scale-125 ease-in duration-100  uppercase  h-0.5 focus:text-blue-400 hover:text-blue-400"
                  key={item.auth0_id}
                  onClick={() => setFilter(item.auth0_id)}
                >
                  {item.nickname}
                </button>
              ))}
          </div>
        </div>
        <div className="flex flex-col h-auto w-full">
          <div className="flex flex-col">
            <div className="flex flex-col w-full ml-[40px]">
              {outfitList &&
                outfitList.map((item: any) => (
                  <div
                    className="flex flex-col h-full border-b-2 items-center mr-8 m-2 lg:h-auto xl:justify-around xl:flex xl:flex-row "
                    key={item.id}
                  >
                    <div className="flex flex-col items-center mt-8 mb-8">
                      <div className=" relative w-[300px] lg:w-[450px]  h-[450px] shadow-2xl overflow-hidden hover:scale-105 ease-in duration-200 ">
                        <img
                          className="w-full  p-4 rounded-md h-full object-cover "
                          src={item.img}
                        />
                      </div>
                      <div className="flex mt-6 ml-4 mb-4">
                        <CommentForm outfitId={item.id} />
                      </div>
                      <div className="border-2 m-4 w-full rounded-md list-none pl-4 h-auto  overflow-auto">
                        <Comments outfitId={item.id} />
                      </div>
                    </div>

                    <div className="flex flex-col h-auto lg:h-[700px] w-full xl:w-2/5 ">
                      <div className=" uppercase lg:mt-10 mr-4 mt-4 ml-4 lg:mb-0 p-2 flex flex-col lg:h-[200px]">
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
                      <div className="h-auto mt-14 mr-6 mb-4 ml-6 lg:mt-[80px]">
                        <p className="uppercase font-semibold text-md lg:text-lg p-2">
                          description
                        </p>
                        <p className="text-sm lg:text-lg">{item.description}</p>
                      </div>
                      <div className="flex w-auto items-center justify-center items-end text-2xl lg:h-[200px] ">
                        <div className="m-2 cursor-pointer hover:text-3xl">
                          <LikeButton outfitId={item.id} />
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
        <div className="sticky invisible md:visible">
          <div className="relative sticky  border-2 ] h-[350px] w-[150px] mr-6 ml-2 top-[100px]">
            <a href="https://www.zara.com/nz/">
              <img
                className="object-cover w-full h-full hover:scale-110 ease-in duration-200"
                src="/ad.png"
                alt=""
              />
            </a>
            <p className="absolute top-0 font-semibold text-2xl m-2">ZARA</p>
            <a href="https://nz.kowtowclothing.com/">
              <img
                className=" border-2 object-cover w-full h-full mt-6 hover:scale-110 ease-in duration-200"
                src="/kt.jpeg"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
