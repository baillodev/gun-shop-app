import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/Login'
import Register from './components/Register'
import Private from './pages/Private/Private'
import PrivateHome from './pages/Private/PrivateHome.jsx/PrivateHome'

function App() {

  return (
    <>
      <Register />
      <Login />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/private' element={<Private />}>
          <Route path='/private/private-home' element={<PrivateHome />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
