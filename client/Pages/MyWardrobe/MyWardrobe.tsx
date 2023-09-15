import { useAuth0 } from '@auth0/auth0-react'
import useMyWardrobeHook from './myWardrobeHook'
import WardrobeList from '../../components/WardrobeList/WardrobeList'
import { useState } from 'react'

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
      <div className="flex flex-col items-center w-[100vw]">
        {isLoading && <div>Loading ...</div>}
        <h1 className="m-20 text-4xl border-b-[5px]">My Wardrobe</h1>
        <div className="flex flex-row justify-center place-content-evenly w-96 border-4 text-2xl mb-[40px] ">
          <button
            className="m-6 focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('')}
          >
            ALL
          </button>
          <button
            className="m-6 focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('outer')}
          >
            OUTER
          </button>
          <button
            className="m-6 focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('top')}
          >
            TOP
          </button>
          <button
            className="m-6 focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('bottom')}
          >
            BOTTOM
          </button>
          <button
            className="m-6 focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('footwear')}
          >
            FOOTWEAR
          </button>
          <button
            className="m-6 focus:text-blue-400 hover:text-blue-400"
            onClick={() => setFilter('accessories')}
          >
            ACC
          </button>
        </div>
      </div>
      {isAuthenticated && (
        <ul>
          <div className="grid col-auto place-content-center">
            <div className="grid grid-cols-4 justify-center">
              {data &&
                data?.length > 0 &&
                data.map((item) => (
                  <li className="list-none flex justfy-center" key={item.id}>
                    <WardrobeList
                      wardrobe={item}
                      handleDeleteItem={handleDeleteItem}
                    />
                  </li>
                ))}
              {data && data?.length == 0 && (
                <li>
                  <h3>Wardrobe is empty!</h3>
                </li>
              )}
            </div>
          </div>
        </ul>
      )}
    </>
  )
}

export default MyWardrobe
