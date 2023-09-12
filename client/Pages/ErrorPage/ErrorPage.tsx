import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <>
      <div className="bg-darkPurple h-screen text-black">
        <div className="pt-44 pl-4 flex flex-col items-center gap-4 bg-darkPurple">
          <div className="flex flex-col items-center text-center">
            <img className="pb-10" alt="error logo" src={`/icon buttons.png`} />
            <p className="text-lightPurple fontFamily-serif text-m pb-10">
              Something went wrong
            </p>
            <button className="w-auto text-primary bg-white py-2 px-4 rounded-lg hover:shadow-[0px_0px_9px_2px_#FF17CE] mb-40">
              <Link to="/">Home</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ErrorPage
