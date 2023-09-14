import Icon from '../UI/Icon/Icon'
import { Wardrobe } from '../../../types/MyWardrobe'
import { Link } from 'react-router-dom'

interface Props {
  wardrobe: Wardrobe
  handleDeleteItem: (id: number) => void
}

function WardrobeList(props: Props) {
  const { wardrobe, handleDeleteItem } = props

  return (
    <>
      <div className="w-[300px] flex flex-col content-center m-16">
        <div className="flex flex-col w-36 flex-auto">
          <div className="object-cover w-[300px]">
            <img src="IMG_5431.jpg" alt="" />
          </div>
          <div className="flex justify-between w-[300px]">
            <h3 className="ml-2 text-orange text-2xl mt-5">{wardrobe.name}</h3>
            <button
              data-testid="testing"
              onClick={() => handleDeleteItem(wardrobe.id)}
            >
              <Icon className="mt-5 mr-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-800">
                <i className="fa-solid fa-trash" />
              </Icon>
            </button>
          </div>
          <p className="ml-2 text-md text-lightPurple w-[300px]">
            {wardrobe.description}
          </p>
        </div>
      </div>
    </>
  )
}

//

export default WardrobeList
