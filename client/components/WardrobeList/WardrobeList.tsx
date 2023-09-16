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
        <div>
          <div className="object-fit w-full relative">
            <img className="rounded-md"src="IMG_5431.jpg" alt="" />
            <div className='absolute top-0 right-0'>
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

          <div className="flex justify-between max-w-[300px]">
            <h3 className="break-all  ml-2 text-orange text-2xl mt-5 font-bold">
              {wardrobe.name}
            </h3>
          </div>
          <p
            data-testid="test"
            className="ml-2 text-md text-lightPurple w-[300px]"
          >
            {wardrobe.description}
          </p>
        </div>
      </div>
    </>
  )
}

export default WardrobeList
