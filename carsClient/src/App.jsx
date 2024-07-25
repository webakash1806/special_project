import React from 'react'
import HomeLayout from './Layouts/HomeLayouts'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'

const App = () => {
  return (
    <HomeLayout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

      </Routes>
    </HomeLayout>
  )
}

export default App