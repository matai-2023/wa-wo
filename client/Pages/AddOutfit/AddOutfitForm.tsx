import Button from '../../components/UI/Button/Button'
import useMyWardrobeHook from '../MyWardrobe/myWardrobeHook'

export default function AddOutfitForm() {
  const customHook = useMyWardrobeHook('')

  const allWardrobe = customHook.data
  const tops = allWardrobe?.filter((item) => item.category == 'top')
  const bottom = allWardrobe?.filter((item) => item.category == 'bottom')
  const outer = allWardrobe?.filter((item) => item.category == 'outer')
  const acc = allWardrobe?.filter((item) => item.category == 'accessories')
  const footwear = allWardrobe?.filter((item) => item.category == 'footwear')

  console.log(tops)

  return (
    <>
      <div className="flex flex-col w-20">
        <select>
          <option value={''}>Choose from</option>
          {tops?.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <select>
          <option value={''}>Choose from</option>
          {bottom?.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <select>
          <option value={''}>Choose from</option>
          {outer?.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <select>
          <option value={''}>Choose from</option>
          {acc?.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <select>
          <option value={''}>Choose from</option>
          {footwear?.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <Button>Add This Outfit!</Button>
    </>
  )
}
