import { Link } from 'react-router-dom'
import { GiClothes } from 'react-icons/gi'
import { IfAuthenticated } from '../../apis/Authenticated'
function Title() {
  return (
    <>
      <div>
        <Link
          className="lg:text-[70px] pr-14 text-orange text-[40px] top-2]"
          to="/"
        >
          <h5 className="ml-2 mb-[40px]">WARDROBE WONDERS</h5>
        </Link>
      </div>
    </>
  )
}

export default Title
