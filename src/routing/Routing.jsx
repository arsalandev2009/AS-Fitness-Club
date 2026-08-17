import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ForgetPassword,
  Login,
  Signup,
  UpdatePassword,
} from "../screens/auth/auth";
import {
  Adminhome,
  Coachhome,
  Landingpage,
  Membercompleteprofile,
  Memberhome,
} from "../screens/app/app";
// import ProtectedRoutingMember from "./ProtectedRoutingMember";
// import ProtectMemberHome from "./ProtectMemberHome";
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
          <Route path="/admin-dashboard" element={<Adminhome />} />
          <Route path="/coach-dashboard" element={<Coachhome />} />

          <Route path="/membercompleteprofile" element={ <ProtectedMemberPage><Membercompleteprofile /> </ProtectedMemberPage> }/>
          <Route path="/member-dashboard" element={ <ProtectedMemberPage> <Memberhome /> </ProtectedMemberPage> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routing;
