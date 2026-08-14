import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ForgetPassword, Login, Signup, UpdatePassword }from '../screens/auth/auth'
import {Adminhome, Coachhome, Home, Memberhome} from '../screens/app/app'


function Routing() {
  return (
    <>
    <BrowserRouter>
    <Routes>


        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/updatepassword' element={<UpdatePassword/>}/>
        <Route path='/forgetpassword' element={<ForgetPassword/>}/>
        <Route path='/admin-dashboard' element={<Adminhome/>}/>
        <Route path='/coach-dashboard' element={<Coachhome/>}/>
        <Route path='/member-dashboard' element={<Memberhome/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default Routing