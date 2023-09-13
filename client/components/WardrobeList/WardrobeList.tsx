import Icon from '../UI/Icon/Icon'
import { Wardrobe } from '../../../types/MyWardrobe'

interface Props {
  wardrobe: Wardrobe
  // handleDeleteItem: (id: number) => void
}

function WardrobeList(props: Props) {
  const { wardrobe } = props

  return (
    <>
      <div>
        <p>{wardrobe.category}</p>
        <p>{wardrobe.part}</p>
      </div>
      <div className="self-center flex-none"></div>
      <div className="flex flex-col w-36 flex-auto">
        <img src="IMG_5431.jpg" alt="" />
        <h3 className="text-orange">{wardrobe.name}</h3>
        <p className="text-xs text-lightPurple">{wardrobe.description}</p>
      </div>
      <div className="flex flex-row gap-2 self-center flex-none">
        {/* <button
          data-testid="testing"
          onClick={() => handleDeleteItem(wardrobe.id)}
        >
          <Icon className="bg-warning">
            <i className="fa-solid fa-trash" />
          </Icon>
        </button> */}
      </div>
    </>
  )
}

//

export default WardrobeList
