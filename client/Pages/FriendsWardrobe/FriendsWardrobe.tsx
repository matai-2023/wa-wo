import { useAuth0 } from '@auth0/auth0-react'
import uesFriendsWardrobeHook from './useFriendsWardrobeHook'
import { useState } from 'react'
import FriendsWardrobeList from '../../components/FriendsWardrobeList/FriendsWardrobeList'
import { Wardrobe } from '../../../types/MyWardrobe'

function FriendsWardrobe() {
  const [filter, setFilter] = useState('')
  const { isAuthenticated } = useAuth0()
  const { data, isLoading } = uesFriendsWardrobeHook(filter)
  const nickname = data?.nickname
  const robes = data?.robes as Wardrobe[]
  return (
    <>
      {' '}
      <div className="flex flex-col items-center w-[100vw]">
        {isLoading && <div>Loading ...</div>}
        {nickname && (
          <h1 className="m-20 text-4xl border-b-[5px]">
            {nickname.nickname} Wardrobe
          </h1>
        )}
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
                robes.length > 0 &&
                robes.map((item: any) => (
                  <li className="list-none flex justify-center" key={item.id}>
                    <FriendsWardrobeList wardrobe={item} />
                  </li>
                ))}
            </div>
          </div>
          {data && robes?.length == 0 && (
            <div className="flex flex-row h-[300px] justify-center items-center">
              <p data-testid="testid" className="text-2xl font-bold">
                Wardrobe is empty!
              </p>
            </div>
          )}
        </ul>
      )}
    </>
  )
}

export default FriendsWardrobe
