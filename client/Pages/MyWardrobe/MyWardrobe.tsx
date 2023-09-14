import { useAuth0 } from '@auth0/auth0-react'
import useMyWardrobeHook from './myWardrobeHook'
import WardrobeList from '../../components/WardrobeList/WardrobeList'

function MyWardrobe() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const { data, isLoading, mutationDel } = useMyWardrobeHook()
  // console.log(data)

  async function handleDeleteItem(id: number) {
    const token = await getAccessTokenSilently()
    mutationDel.mutate({ id: id, token: token })
    console.log(token)
  }

  return (
    <>
      {isLoading && <div>Loading ...</div>}
      <h1>My Wardrobe</h1>
      {isAuthenticated && (
        <ul>
          {data &&
            data?.length > 0 &&
            data.map((item) => (
              <li className="list-none flex gap-4" key={item.id}>
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
        </ul>
      )}
    </>
  )
}

export default MyWardrobe
