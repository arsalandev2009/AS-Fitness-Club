import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {ForgetPassword,Login,Signup,UpdatePassword,} from "../screens/auth/auth";
import {Admindashboard,Adminhome,Adminmembers,Adminsetting,Adminstore,ComingSoon,Error,Landingpage,Membercompleteprofile,Memberhome, Memberstore,} from "../screens/app/app";
import ProtectedMemberPage from "./ProtectedMemberPage";




function Routing() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={ <ProtectedMemberPage> <Login /> </ProtectedMemberPage>  } />
          <Route path="/signup" element={<Signup />} />
          <Route path="/updatepassword" element={<UpdatePassword />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />


          <Route path="/admin-dashboard" element={<Admindashboard/>} >

          <Route index element={<Adminhome/>} />
          <Route path="admin-home" element={<Adminhome/>} />
          <Route path="admin-member" element={<Adminmembers/>} />
          <Route path="admin-store" element={<Adminstore/>} />
          <Route path="admin-setting" element={<Adminsetting/>} />
          
          </Route>

          <Route path="/membercompleteprofile" element={ <ProtectedMemberPage><Membercompleteprofile /> </ProtectedMemberPage> }/>
          <Route path="/member-dashboard" element={ <ProtectedMemberPage> <Memberhome /> </ProtectedMemberPage> } />
          {/* <Route path="/member-store" element={<Memberstore/>}/> */}

          <Route path="/ComingSoon" element={<ComingSoon/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routing;
