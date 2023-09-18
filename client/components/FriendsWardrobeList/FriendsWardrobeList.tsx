import { Wardrobe } from '../../../types/MyWardrobe'

interface Props {
  wardrobe: Wardrobe
}

function FriendsWardrobeList(props: Props) {
  const { wardrobe } = props

  return (
    <>
      <div>
        <div className="relative w-full overflow-hidden ">
          <img
            className="w-full rounded-md h-[350px] object-cover"
            src={wardrobe.image}
            alt="image"
          />
        </div>
        <div className="flex w-full justify-between">
          <h3 className="break-all ml-2 text-orange text-md lg:text-xl mt-5 font-bold">
            {wardrobe.name}
          </h3>
        </div>
        <p className="break-all ml-2 text-md " data-testid="test">
          {wardrobe.description}
        </p>
      </div>
    </>
  )
}

export default FriendsWardrobeList
