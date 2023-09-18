import { useAuth0 } from '@auth0/auth0-react'
import useMyWardrobeHook from './myWardrobeHook'
import WardrobeList from '../../components/WardrobeList/WardrobeList'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function MyWardrobe() {
  const [filter, setFilter] = useState('')
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const { data, isLoading, mutationDel } = useMyWardrobeHook(filter)

  async function handleDeleteItem(id: number) {
    const token = await getAccessTokenSilently()
    mutationDel.mutate({ id: id, token: token })
  }

  return (
    <>
      {' '}
      {isLoading && <div>Loading ...</div>}
      <div className="flex mt-[100px]">
        <div className="sticky w-auto h-[700px] top-[40px]  flex flex-col place-content-evenly top-[300px] border-r-2 text-md lg:text-xl mb-[20px] ">
          <button
            className="m-6 hover:max-w-full hover:scale-125 ease-in duration-100 h-0.5 focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('')}
          >
            ALL
          </button>
          <button
            className="m-6 hover:max-w-full hover:scale-125 ease-in duration-100 h-0.5  focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('outer')}
          >
            OUTER
          </button>
          <button
            className="m-6 hover:max-w-full hover:scale-125 ease-in duration-100 h-0.5  focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('top')}
          >
            TOP
          </button>
          <button
            className="m-6 hover:max-w-full hover:scale-125 ease-in duration-100 h-0.5  focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('bottom')}
          >
            BOTTOM
          </button>
          <button
            className="m-6 hover:max-w-full hover:scale-125 ease-in duration-100 h-0.5  focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('footwear')}
          >
            FOOTWEAR
          </button>
          <button
            className="m-6 hover:max-w-full hover:scale-125 ease-in duration-100 h-0.5  focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('accessories')}
          >
            ACC
          </button>
        </div>
        <div className="w-screen">
          <div className="flex md:justify-between justify-evenly mb-16 mr-16 ml-16  text-4xl border-b-[5px] w-10/12">
            <h1 className="italic text-2xl left-[100px] lg:text-[40px]">
              My Wardrobe
            </h1>
            <Link
              to={'/add-item'}
              className=" hover:max-w-full md:mr-[40px] hover:scale-125 ease-in transition-all md:right-10  h-0.5 text-sm lg:text-[20px] hover:text-orange mb-2"
            >
              ITEM
              <i className="fa-solid fa-plus text-sm lg:text-2xl"></i>
            </Link>
          </div>
          {isAuthenticated && (
            <ul>
              <div className="ml-[50px] mr-[80px] cols-4 place-content-center">
                <div className="grid grid-cols-[300px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
                  {data &&
                    data?.length > 0 &&
                    data.map((item) => (
                      <li
                        className="list-none hover:scale-105 ease-in duration-200 shadow-2xl md:shrink:0 w-[250px] pb-4 cursor-pointer hover:border-2 hover:rounded-lg hover:border-orange border-b-2 border-black m-6 "
                        key={item.id}
                      >
                        <WardrobeList
                          wardrobe={item}
                          handleDeleteItem={handleDeleteItem}
                        />
                      </li>
                    ))}
                  {data && data.length == 0 && (
                    <div className="w-auto col-end-4">
                      <p className="text-2xl font-bold">Wardrobe is empty!</p>
                    </div>
                  )}
                </div>
              </div>
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default MyWardrobe
