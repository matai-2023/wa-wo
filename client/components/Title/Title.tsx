import { Link } from 'react-router-dom'

function Title() {
  return (
    <>
      <div className="mt-4">
        <Link
          className=" flex flex-col hover:scale-105 ease-in duration-300 hover:text-blue-400 md:flex lg:flex-row lg:text-[60px] md:text-[50] pr-14 text-orange text-[30px] top-2]"
          to="/"
        >
          <span className="font-lucky md:mr-4">WARDROBE </span>
          <span className="font-lucky">WONDERS</span>
        </Link>
      </div>
    </>
  )
}

export default Title
