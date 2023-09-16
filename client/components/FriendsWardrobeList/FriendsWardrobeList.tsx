import { Wardrobe } from '../../../types/MyWardrobe'

interface Props {
  wardrobe: Wardrobe
}

function FriendsWardrobeList(props: Props) {
  const { wardrobe } = props

  return (
    <>
      <div>
        <div>
          <div className="object-fit w-full relative">
            <img src={wardrobe.image} alt="image" />
          </div>
          <div className="flex justify-between max-w-[300px]">
            <h3 className="break-all ml-2 text-orange text-2xl mt-5 font-bold">
              {wardrobe.name}
            </h3>
          </div>
          <p className="ml-2 text-md text-lightPurple w-[300px]">
            {wardrobe.description}
          </p>
        </div>
      </div>
    </>
  )
}

export default FriendsWardrobeList
