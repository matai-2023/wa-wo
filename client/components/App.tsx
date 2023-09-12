import { Routes, Route } from 'react-router-dom'

import Nav from './Nav.tsx'
import Home from '../Pages/Home/Home.tsx'
import ErrorPage from '../Pages/ErrorPage/ErrorPage.tsx'
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </>
  )
}

export default App
