import { Link } from 'react-router-dom'
import Icon from '../../components/UI/Icon/Icon'
import Button from '../../components/UI/Button/Button'

function ErrorPage() {
  return (
    <>
      <div className="h-screen text-black">
        <div className="mt-12 pl-4 flex flex-col items-center gap-4">
          <div className="flex flex-col items-center text-center">
            <img
              className="pb-10 max-w-sm rounded-full"
              alt="error logo"
              src="/wardrobewonders.png"
            />
            <p className="text-orange font-bold text-m pb-10 pt=10 text-2xl">
              Something went wrong
            </p>
            <p className="text-orange font-bold text-m pb-10 pt=10 text-xl">
              Please, click HOME
            </p>
            <Icon className="mb-4">
              <svg
                className="w-6 h-6 text-orange"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
              </svg>
            </Icon>
            <Link to="/">
              <Button>Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ErrorPage
