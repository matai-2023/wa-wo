import LoginButton from '../../components/Login/Login'

function Home() {
  return (
    <>
      <div className="flex flex-row justify-evenly mt-[100px]">
        <div className=" box-border rounded-md w-[400px] h-[500px] flex items-center  bg-orange space">
          <img src="home2.png" alt="home logo" />
        </div>
        <div className="flex items-center space-y-50">
          <LoginButton />
        </div>
      </div>
    </>
  )
}

export default Home
