import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../Header/Header'

function AppLayout() {
  const { pathname } = useLocation()

  //function to edit path name
  function editPath(path: string) {
    //remove the / in pathname
    const name = path.slice(1)
    //replace the - with space in pathname
    const editedName = name.replace('-', ' ')
    //return Home if no path provided or path does not exist
    if (editedName == '') return 'Home'
    //Modify path name to be in the right format
    if (editedName.split(' ').length == 1) {
      return editedName.charAt(0).toUpperCase() + editedName.slice(1)
    } else {
      const editedNameArray = editedName.split(' ')
      const newName = editedNameArray.map(
        (item) => item.charAt(0).toUpperCase() + item.slice(1)
      )
      return newName.join(' ')
    }
  }

  //useEffect to set title
  useEffect(() => {
    document.title = editPath(pathname)
  }, [pathname])

  return (
    <>
      <div className="ml-8 mt-4 w-100vw">
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default AppLayout
