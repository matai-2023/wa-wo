import Icon from '../UI/Icon/Icon'
import { Wardrobe } from '../../../types/MyWardrobe'

interface Props {
  wardrobe: Wardrobe
  handleDeleteItem: (id: number) => void
}

function WardrobeList(props: Props) {
  const { wardrobe, handleDeleteItem } = props

  return (
    <>
      <div>
        <div className=" relative w-full overflow-hidden ">
          <img
            className="w-full rounded-md h-[350px] object-cover"
            src={wardrobe.image}
            alt=""
          />
          <div className="absolute top-0 right-0">
            <button
              data-testid="testing"
              onClick={() => handleDeleteItem(wardrobe.id)}
            >
              <Icon className="bg-blue-500 text-white p-2 rounded hover:bg-blue-800">
                <i className="fa-solid fa-trash" />
              </Icon>
            </button>
          </div>
        </div>
        <div>
          <div className="flex w-full justify-between ">
            <h3 className="break-all  ml-2 text-orange text-md lg:text-xl mt-5 font-bold">
              {wardrobe.name}
            </h3>
          </div>
          <p data-testid="test" className="break-all ml-2 text-md ">
            {wardrobe.description}
          </p>
        </div>
      </div>
    </>
  )
}

export default WardrobeList
