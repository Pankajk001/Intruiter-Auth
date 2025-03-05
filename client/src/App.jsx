import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EmailVerify from './pages/EmailVerify'
import Home from './pages/Home'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className='w-[100vw] h-[100vh] bg-[#00003C]'>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />  
      </Routes>
    </div>
  )
}

export default App
