import { Wardrobe } from '../../../types/MyWardrobe'

interface Props {
  wardrobe: Wardrobe
}

function FriendsWardrobeList(props: Props) {
  const { wardrobe } = props

  return (
    <>
      <div className="w-[300px] flex flex-col content-center m-16">
        <div className="flex flex-col w-36 flex-auto">
          <div className="object-cover w-[300px]">
            <img src={wardrobe.image} alt="image" />
          </div>
          <div className="flex justify-between w-[300px]">
            <h3 className="ml-2 text-orange text-2xl mt-5 font-bold">
              {wardrobe.name}
            </h3>
          </div>
          <p
            className="ml-2 text-md text-lightPurple w-[300px]"
            data-testid="test"
          >
            {wardrobe.description}
          </p>
        </div>
      </div>
    </>
  )
}

export default FriendsWardrobeList
