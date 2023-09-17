import { Link } from 'react-router-dom'
function Title() {
  return (
    <>
      <div className=' '>
    <Link className=" flex flex-col md:flex lg:flex-row lg:text-[70px] md:text-[50] pr-14 text-orange text-[30px] top-2]" to="/">
      <span className='font-lucky md:mr-4'>WARDROBE </span>
      <span className='font-lucky'>WONDERS</span>
    </Link>
        </div>
        </>
      
  )
}

export default Title
