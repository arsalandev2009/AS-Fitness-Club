import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ForgetPassword, Login, Signup, UpdatePassword }from '../screens/auth/auth'


function Routing() {
  return (
    <>
    <BrowserRouter>
    <Routes>


        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/updatepassword' element={<UpdatePassword/>}/>
        <Route path='/forgetpassword' element={<ForgetPassword/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default Routing