import { useNavigate } from 'react-router-dom'
import Button from '../../components/UI/Button/Button'
import useMyWardrobeHook from '../MyWardrobe/myWardrobeHook'
import useAddOutfit from './useAddOutfit'
import { useAuth0 } from '@auth0/auth0-react'

export default function AddOutfitForm() {
  //-------------------------------------------------------
  const navigate = useNavigate()
  const { getAccessTokenSilently } = useAuth0()
  //-------------------------------------------------------
  //-------------------------------------------------------
  //Constructing data to choose from-----------------------
  //-------------------------------------------------------
  //-------------------------------------------------------
  const customHook = useMyWardrobeHook('')
  const allWardrobe = customHook.data
  const tops = allWardrobe?.filter((item) => item.category == 'top')
  const bottom = allWardrobe?.filter((item) => item.category == 'bottom')
  const outer = allWardrobe?.filter((item) => item.category == 'outer')
  const acc = allWardrobe?.filter((item) => item.category == 'accessories')
  const footwear = allWardrobe?.filter((item) => item.category == 'footwear')
  //--------------------------------------------------------
  //grabbing mutation---------------------------------------
  //-------------------------------------------------------
  //-------------------------------------------------------
  const outfithook = useAddOutfit()
  const mutationAddOutfit = outfithook.mutationAddOutfit

  //-------------------------------------------------------
  //-------------------------------------------------------
  //Function to handle submit------------------------------
  //-------------------------------------------------------
  //-------------------------------------------------------

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    //-------------------------------------------------------
    //-------------------------------------------------------
    //Getting form data--------------------------------------
    //-------------------------------------------------------
    //-------------------------------------------------------
    const form = new FormData(e.currentTarget)
    //-------------------------------------------------------
    //-------------------------------------------------------
    //Constructing newOutfit---------------------------------
    //-------------------------------------------------------
    //-------------------------------------------------------

    const token = await getAccessTokenSilently()
    mutationAddOutfit.mutate({ newOutfit: form, token: token })
    navigate('/outfit')
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col w-30">
          <select name="top">
            <option value={''}>Choose from Top</option>
            {tops?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <select name="bottom">
            <option value={''}>Choose from Bottom</option>
            {bottom?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <select name="outer">
            <option value={''}>Choose from Outers</option>
            {outer?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <select name="accessories">
            <option value={''}>Choose from Accessories</option>
            {acc?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <select name="footwear">
            <option value={''}>Choose from Footwear</option>
            {footwear?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <input type="file" name="image" required />
          <input
            placeholder="describe your outfit!"
            name="description"
            required
          />
          <Button>Add This Outfit!</Button>
        </form>
      </div>
    </>
  )
}
