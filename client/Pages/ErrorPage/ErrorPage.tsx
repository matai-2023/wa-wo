import { Link } from 'react-router-dom'
import Icon from '../../components/UI/Icon/Icon'

function ErrorPage() {
  return (
    <>
      <div className="h-screen text-black">
        <div className="mt-12 pl-4 flex flex-col items-center gap-4">
          <div className="flex flex-col items-center text-center">
            <img className="pb-10 max-w-sm rounded-full" alt="error logo" src='/public/wardrobewonders.png'/>
            <p className="text-orange font-bold text-m pb-10 pt=10 text-2xl">
              Something went wrong
            </p>
            <p className="text-orange font-bold text-m pb-10 pt=10 text-xl">
              Please, click HOME 
            </p>
            <Icon className='mb-4'><svg className="w-6 h-6 text-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
</svg>
</Icon>
            <button className="w-auto text-primary bg-white py-2 px-4 rounded-lg hover:shadow-[0px_0px_9px_2px_#F4980E] mb-40">
              <Link to="/" className='text-orange text-xl' >Home</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ErrorPage
