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
        <div className='flex'>
         <div className="sticky h-[700px] top-[40px]  flex flex-col place-content-evenly w-auto top-[300px] border-r-2 text-md lg:text-2xl mb-[20px] ">
          <button
            className="m-6 hover:max-w-full transition-all duration-500 h-0.5 focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('')}
          >
            ALL
          </button>
          <button
            className="m-6 hover:max-w-full transition-all duration-500 h-0.5  focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('outer')}
          >
            OUTER
          </button>
          <button
            className="m-6 hover:max-w-full transition-all duration-500 h-0.5  focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('top')}
          >
            TOP
          </button>
          <button
            className="m-6 hover:max-w-full transition-all duration-500 h-0.5  focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('bottom')}
          >
            BOTTOM
          </button>
          <button
            className="m-6 hover:max-w-full transition-all duration-500 h-0.5  focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('footwear')}
          >
            FOOTWEAR
          </button>
          <button
            className="m-6 hover:max-w-full transition-all duration-500 h-0.5  focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('accessories')}
          >
            ACC
          </button>
       </div>
        <div className='w-screen'>
         <div className='flex md:justify-between justify-evenly mb-16 mr-16 ml-16  text-4xl border-b-[5px] w-10/12'>
          <h1 className='italic text-2xl left-[100px] lg:text-[40px]'>My Wardrobe</h1>
              <Link to={'/add-item'}
              className=" hover:max-w-full md:mr-[40px] transition-all md:right-10 duration-500 h-0.5 text-sm lg:text-[20px] hover:text-blue-400 mb-2"
              >ITEM
                <i className='fa-solid fa-plus text-sm lg:text-2xl'></i>
              </Link>
        </div>
         {isAuthenticated && (
        
         <ul>
          
          <div className="ml-[50px] mr-[80px] place-content-center">
            <div className="grid grid-cols-[300px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
            {data &&
                data?.length > 0 && 
                data.map((item) => (
                  <li className="list-none w-[250px] md:shrink-0 md:mr-[40px] pb-4 cursor-pointer hover:border-2 hover:rounded-lg border-b-2 border-black hover:border-orange shadow-2xl ml-6 mr-6 mt-10 mb-6 " key={item.id}>
                    <WardrobeList
                      wardrobe={item}
                      handleDeleteItem={handleDeleteItem}
                    />
                  </li>
                ))}
                   {data && data.length == 0 &&
                <div className='w-auto col-end-4'>
                   <p className='text-2xl font-bold'>Wardrobe is empty!</p>

                   </div>}
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
