//Hooks
import useFriendList from '../../hooks/useFriendList'
import useOutfit from './useCommentHook'
import useOutfits from './outfitHook'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../apis/api'
//Components
import Comments from '../../components/Comment/Comment'
import CommentForm from '../../components/Comment/CommentForm'
import { useState } from 'react'
import { BiSolidTShirt } from 'react-icons/bi'
import LikeButton from '../../components/LikeButton/LikeButton'
import { ImBin } from 'react-icons/im'
import { Link } from 'react-router-dom'
//Functions -----------------------------------------------------------------

export default function Outfit() {
  const { getAccessTokenSilently, user } = useAuth0()
 
  //----------------------------------------------------------
  //State to handle what to show when clicking Sort-----------
  //----------------------------------------------------------
  const [filter, setFilter] = useState('')
  //----------------------------------------------------------
  //Getting friendlist to show on left nav--------------------
  //----------------------------------------------------------
  const customFriendList = useFriendList()
  const friendList = customFriendList.data
  //----------------------------------------------------------
  //Getting all outfits to display----------------------------
  //----------------------------------------------------------
  const customOutfitList = useOutfit(filter)
  const outfitList = customOutfitList.data

  //Navigate hook set up--------------------------------------
  const navigate = useNavigate()
  //----------------------------------------------------------
  //custom hook to handle delete outfits----------------------
  //----------------------------------------------------------
  const customize = useOutfits()
  const mutationDelete = customize.outfitDelMutation
  //----------------------------------------------------------
  //Getting userId to show/not show the delete buttons--------
  //----------------------------------------------------------
  const userId = user?.sub
  //----------------------------------------------------------
  //Handle clicking delete button-----------------------------
  //----------------------------------------------------------
  async function handleDeleteOutfit(id: number) {
    const token = await getAccessTokenSilently()
    mutationDelete.mutate({ id: id, token: token })
  }
  //----------------------------------------------------------
  //Rendering-------------------------------------------------
  //----------------------------------------------------------
  return (
    <>
      <div className="w-screen">
        <div className="flex justify-between  border-b-[5px] mt-32 mb-32 mr-16 ml-16 w-10/12 text-4xl ">
          <h1 className="italic text-2xl left-[100px]  lg:text-[40px] mb-2">
            oOtd
          </h1>
          <Link
            to={'/outfit/add'}
            className="uppercase hover:max-w-full md:mr-[40px] hover:scale-125 ease-in transition-all md:right-10  h-0.5 text-sm lg:text-[20px] hover:text-orange mb-2"
          >
            Outfit
            <i className="fa-solid fa-plus text-sm lg:text-2xl"></i>
          </Link>
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
                  outfitList.reverse().map((item: any) => (
                    <div
                      className="flex flex-col h-full border-b-2 items-center mr-8 m-2 lg:h-auto xl:justify-around xl:flex xl:flex-row "
                      key={item.id}
                    >
                      <div className="flex flex-col items-center mt-8 mb-8">
                        <h1 className="text-2xl italic underline tracking-widest uppercase font-semibold mb-4 ">
                          {` ${item.nickname} `}
                        </h1>
                        <div className=" relative w-[300px] lg:w-[450px]  h-[450px] shadow-2xl overflow-hidden hover:scale-105 ease-in duration-200 ">
                          <img
                            className="w-full p-4 rounded-md h-full object-cover"
                            src={item.img}
                            alt="outfit-images"
                          />
                        </div>
                        <div className="flex mt-6 ml-4 mb-4">
                          <CommentForm outfitId={item.id} />
                        </div>
                        <div className="border-2 m-4 w-full max-h-[200px] rounded-md list-none pl-4 h-auto  overflow-auto">
                          <Comments outfitId={item.id} />
                        </div>
                      </div>

                      <div className="flex flex-col h-auto lg:h-[700px] w-full xl:w-2/5 ">
                        <div className=" uppercase lg:mt-10 mr-4 mt-4 ml-14 lg:ml-4 lg:mb-0 p-2 flex flex-col lg:h-[200px]">
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
                              footwear:{' '}
                            </p>
                            <p className="text-sm lg:text-lg">
                              {item.footwear}
                            </p>
                          </div>
                        </div>
                        <div className="h-auto mt-14 mr-[80px] lg:mr-6 mb-4 ml-16 lg:ml-6 lg:mt-[80px]">
                          <p className="uppercase font-semibold text-orange text-md lg:text-lg">
                            description:
                          </p>
                          <p className="text-sm lg:text-lg">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex w-auto items-center justify-center   lg:h-[200px] ">
                          <div className="m-2 cursor-pointer text-2xl hover:text-3xl">
                            <LikeButton outfitId={item.id} />
                          </div>
                          <div className="m-4 cursor-pointer text-[23px] hover:text-3xl">
                            <BiSolidTShirt
                              onClick={() =>
                                navigate(`/friend/${item.user_id}`)
                              }
                            />
                          </div>
                          <div className="m-4 cursor-pointer text-xl hover:text-3xl">
                            {userId == item.user_id && (
                              <ImBin
                                onClick={() => handleDeleteOutfit(item.id)}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="relative invisible md:visible">
            <div className=" sticky border-2 ] h-[350px] w-[120px] mr-6 ml-2 top-[100px]">
              <a href="https://www.zara.com/nz/">
                <img
                  className="object-cover shadow-lg w-full h-full hover:scale-110 ease-in duration-200"
                  src="/ad.png"
                  alt=""
                />
              </a>
              <p className="absolute top-0 font-semibold text-2xl dark:text-black m-2">
                ZARA
              </p>
              <button className="absolute bottom-2 text-xl text-white">
                shop now
              </button>
              <a href="https://nz.kowtowclothing.com/">
                {' '}
                <img
                  className="border-2 object-cover relative w-full h-full mt-6 hover:scale-110 ease-in duration-200"
                  src="/kt.jpeg"
                  alt=""
                />
                <p className="absolute text-white font-bold text-xl italic right-[15px] top-[380px]">
                  15% <br /> OFF
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
