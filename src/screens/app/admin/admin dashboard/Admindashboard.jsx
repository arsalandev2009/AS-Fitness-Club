// import React, { useEffect, useState } from "react";
// import { AdminHeader } from "../../../../component/component";
// import { NavLink, Outlet } from "react-router-dom";
// import { FiMenu } from "react-icons/fi";
// import { IoClose } from "react-icons/io5";
// import './Admindashboard.css'

// function Admindashboard() {

//   const [menu,setMenu]=useState(false)

//   const openMenu=()=>{
// setMenu(!menu)
// }
//   return (
//     <div className="bg-black ">

//       <div style={{zIndex:'999'}} >
//         <AdminHeader />
//       </div>

//       <div className="text-white d-flex "  style={{padding: "70px 10px 0px 10px", height:'100dvh'}} >

//         <div  className="admindesktop border-end pt-5 d-flex flex-column px-2 gap-4 list-unstyled fs-4" style={{width:'12%'}}>

//           <li className="sidebar-btn btn fs-5 px-4 py-2 rounded-3" style={{ backgroundColor: "#111827", border: "1px solid #bfff00", boxShadow: "0 0 12px rgba(191, 255, 0, 0.15)", }} ><NavLink className="sidebar-link text-decoration-none fw-semibold" style={{color:"#bfff00"}} to="admin-home">Home</NavLink></li>
//           <li className="sidebar-btn btn fs-5 px-4 py-2 rounded-3" style={{ backgroundColor: "#111827", border: "1px solid #bfff00", boxShadow: "0 0 12px rgba(191, 255, 0, 0.15)", }} ><NavLink className="sidebar-link text-decoration-none fw-semibold" style={{color:'#bfff00'}} to="admin-member"> Members</NavLink></li>
//           <li className="sidebar-btn btn fs-5 px-4 py-2 rounded-3" style={{ backgroundColor: "#111827", border: "1px solid #bfff00", boxShadow: "0 0 12px rgba(191, 255, 0, 0.15)", }} ><NavLink className="sidebar-link text-decoration-none fw-semibold" style={{color:'#bfff00'}} to="admin-store"> My store</NavLink></li>
//           <li className="sidebar-btn btn fs-5 px-4 py-2 rounded-3" style={{ backgroundColor: "#111827", border: "1px solid #bfff00", boxShadow: "0 0 12px rgba(191, 255, 0, 0.15)", }} ><NavLink className="sidebar-link text-decoration-none fw-semibold" style={{color:'#bfff00'}} to="admin-setting"> Settings</NavLink></li>
//         </div>
       
//        <div className = {`mobile`} style={{height:'100%'}}>

//        {menu ? '':(<button onClick={openMenu} className="btn btn-dark text-success border border-success rounded-3 py-2 ms-2 mt-1 fs-4" ><FiMenu /></button>)}     

//          <div className = {`mobilemenu ${menu?'show':''} `} style={{backgroundColor:'#021220',width:'100%',height:'100%'}}> 
//             {menu && (
              
//               <div className="px-4">
//               <div style={{textAlign:'end'}} onClick={()=>{setMenu(false)}}><IoClose size={30}/></div>

//                <div  className="d-flex flex-column px-2 gap-4 list-unstyled fs-4" style={{width:'200px'}}>
//                 <li className="sidebar-btn btn fs-5 px-4 py-2 rounded-3" style={{ backgroundColor: "#111827", border: "1px solid #bfff00", boxShadow: "0 0 12px rgba(191, 255, 0, 0.15)", }} ><NavLink className="sidebar-link text-decoration-none fw-semibold" style={{color:"#bfff00"}} onClick={()=>{setMenu(false)}} to="admin-home">Home</NavLink></li>
//                 <li className="sidebar-btn btn fs-5 px-4 py-2 rounded-3" style={{ backgroundColor: "#111827", border: "1px solid #bfff00", boxShadow: "0 0 12px rgba(191, 255, 0, 0.15)", }} ><NavLink className="sidebar-link text-decoration-none fw-semibold" style={{color:'#bfff00'}} onClick={()=>{setMenu(false)}} to="admin-member"> Members</NavLink></li>
//                 <li className="sidebar-btn btn fs-5 px-4 py-2 rounded-3" style={{ backgroundColor: "#111827", border: "1px solid #bfff00", boxShadow: "0 0 12px rgba(191, 255, 0, 0.15)", }} ><NavLink className="sidebar-link text-decoration-none fw-semibold" style={{color:'#bfff00'}} onClick={()=>{setMenu(false)}} to="admin-store"> My store</NavLink></li>
//                 <li className="sidebar-btn btn fs-5 px-4 py-2 rounded-3" style={{ backgroundColor: "#111827", border: "1px solid #bfff00", boxShadow: "0 0 12px rgba(191, 255, 0, 0.15)", }} ><NavLink className="sidebar-link text-decoration-none fw-semibold" style={{color:'#bfff00'}} onClick={()=>{setMenu(false)}} to="admin-setting"> Settings</NavLink></li>
//                </div>
//               </div>
//             )}
//          </div>
//        </div>

//         <div style={{width:'80%',}} className="pt-5 px-3"> 
         
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Admindashboard;

// import { AdminHeader } from "../../../../component/component";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../assets/FitPlan_AI_Individual_Assets/logo.png";
import { NavLink, Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import "./Admindashboard.css";
import { supabase } from "../../../../utils/supabase";

function Admindashboard() {
   const [logoutPopup,setLogoutPopup] =useState(false)
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signOut();
    if (error) {
      console.log(error.message);
      alert("Error to logout");
      return
    }
    setLogoutPopup(false)
    navigate('/')
  };

  const [menu, setMenu] = useState(false);

  return (
    <div style={{ backgroundColor: "black", height: "100dvh" }}>

      
      <div style={{ position: "fixed", zIndex: "1001", left: "0", right: "0", top: "0", }} >
             <header className="fit-header d-flex align-items-center justify-content-between px-2 py-2.5 border-bottom bg-black"  >

        <img src={Logo} alt="AS Diet Planner" width={150} />

        <button onClick={()=>{setLogoutPopup(true)}}  className="btn px-4 py-2 fw-semibold rounded-3" style={{ backgroundColor: "#bfff00", color: "#000", border: "none", }}>Logout </button>
      </header>

{logoutPopup && (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      backdropFilter: "blur(6px)",
      zIndex: "9999",
    }}
  >
    <div
      className="rounded-4 p-4 text-center"
      style={{
        width: "90%",
        maxWidth: "400px",
        backgroundColor: "#111827",
        border: "1px solid #bfff00",
        boxShadow: "0 0 30px rgba(191, 255, 0, 0.15)",
      }}
    >
      <h4
        className="fw-bold mb-2"
        style={{ color: "#bfff00" }}
      >
        Logout?
      </h4>

      <p className="text-secondary mb-4">
        Are you sure you want to logout from your account?
      </p>

      <div className="d-flex justify-content-center gap-3">

        <button
          onClick={() => setLogoutPopup(false)}
          className="btn px-4 py-2 fw-semibold rounded-3"
          style={{
            backgroundColor: "transparent",
            color: "#fff",
            border: "1px solid #6b7280",
          }}
        >
          Cancel
        </button>

        <button
          onClick={handleLogout}
          className="btn px-4 py-2 fw-semibold rounded-3"
          style={{
            backgroundColor: "#bfff00",
            color: "#000",
            border: "none",
          }}
        >
          Logout
        </button>

      </div>
    </div>
  </div>
)} 
      </div>

     
    <div className="mobile">
       <div style={{ position: "relative" }}>

        {!menu && (
          <div style={{ position: "absolute", top: "70px", right: "10px", zIndex: "1" }}> <button onClick={() => setMenu(true)} className="py-1 px-2 ms-2 mt-2 btn" style={{ backgroundColor: "#111827", color: "#BFFF00", border: "1px solid #BFFF00", }} > <FiMenu size={30} /> </button> </div>
        )}

       
        <div style={{ width: "100%", minHeight: "100dvh", padding:'80px 0px 0px 10px' , color:'white' }}><Outlet /></div>

      </div>

      
      {menu && (
        <div className={`mobilemenu ${menu ? 'open':''}` }  style={{ display:'flex', flexDirection:'column', gap:'20px', position: "fixed", top: "70px", right: "0", width: "230px", height: "calc(100dvh - 70px)", backgroundColor: "#111827", zIndex: "999", padding: "5px 20px", }} >

         
          <div  style={{ cursor: "pointer" }} > <IoClose size={35} color="#bfff00"  onClick={()=>{setMenu(false)}}/> </div>

            <NavLink  to="admin-home"  className="text-decoration-none d-block my-2"  onClick={() => setMenu(false)} > <li className="sidebar-btn btn fs-5 px-4 py-2 rounded-3 w-100" style={{ backgroundColor: "#111827", border: "1px solid #bfff00", boxShadow: "0 0 12px rgba(191, 255, 0, 0.15)", color: "#bfff00" }}> Home </li> </NavLink>
            <NavLink  to="admin-member"  className="text-decoration-none d-block my-2"  onClick={() => setMenu(false)} > <li className="sidebar-btn btn fs-5 px-4 py-2 rounded-3 w-100" style={{ backgroundColor: "#111827", border: "1px solid #bfff00", boxShadow: "0 0 12px rgba(191, 255, 0, 0.15)", color: "#bfff00" }}> Members </li> </NavLink>
            <NavLink  to="admin-store"  className="text-decoration-none d-block my-2"  onClick={() => setMenu(false)} > <li className="sidebar-btn btn fs-5 px-4 py-2 rounded-3 w-100" style={{ backgroundColor: "#111827", border: "1px solid #bfff00", boxShadow: "0 0 12px rgba(191, 255, 0, 0.15)", color: "#bfff00" }}> My store </li> </NavLink>
            <NavLink  to="admin-setting"  className="text-decoration-none d-block my-2"  onClick={() => setMenu(false)} > <li className="sidebar-btn btn fs-5 px-4 py-2 rounded-3 w-100" style={{ backgroundColor: "#111827", border: "1px solid #bfff00", boxShadow: "0 0 12px rgba(191, 255, 0, 0.15)", color: "#bfff00" }}> Settings </li> </NavLink>

        </div>
      )}
    </div>


<div className="desktop d-none d-md-flex"
  style={{
    minHeight: "100dvh",
    backgroundColor: "#000",
  }}
>
  
  {/* Sidebar */}
  <div
    className="adminsidebar border-end d-flex flex-column px-2 gap-4 flex-shrink-0"
    style={{
      minHeight: "100dvh",
      paddingTop: "90px",
      backgroundColor: "#0b0f19",
      borderColor: "#bfff00",
    }}
  >

  <NavLink
  end
  className="sidebar-btn btn fs-5 px-3 py-2 rounded-3 text-decoration-none fw-semibold"
  style={{
    backgroundColor: "#111827",
    color: "#bfff00",
    border: "1px solid #bfff00",
    boxShadow: "0 0 12px rgba(191, 255, 0, 0.15)",
  }}
  to="/admin-dashboard"
>
  Home
</NavLink>

    <NavLink
      className="sidebar-btn btn fs-5 px-3 py-2 rounded-3 text-decoration-none fw-semibold"
      style={{
        backgroundColor: "#111827",
        color: "#bfff00",
        border: "1px solid #bfff00",
        boxShadow: "0 0 12px rgba(191, 255, 0, 0.15)",
      }}
      to="admin-member"
    >
      Members
    </NavLink>

    <NavLink
      className="sidebar-btn btn fs-5 px-3 py-2 rounded-3 text-decoration-none fw-semibold"
      style={{
        backgroundColor: "#111827",
        color: "#bfff00",
        border: "1px solid #bfff00",
        boxShadow: "0 0 12px rgba(191, 255, 0, 0.15)",
      }}
      to="admin-store"
    >
      My Store
    </NavLink>

    <NavLink
      className="sidebar-btn btn fs-5 px-3 py-2 rounded-3 text-decoration-none fw-semibold"
      style={{
        backgroundColor: "#111827",
        color: "#bfff00",
        border: "1px solid #bfff00",
        boxShadow: "0 0 12px rgba(191, 255, 0, 0.15)",
      }}
      to="admin-setting"
    >
      Settings
    </NavLink>

  </div>


  {/* Outlet */}
  <main
    className="flex-grow-1"
    style={{
      minHeight: "100dvh",
      paddingTop: "90px",
      paddingLeft: "25px",
      paddingRight: "25px",
      paddingBottom: "30px",
      backgroundColor: "#050505",
      color: "white",
      overflowX: "hidden",
      minWidth: 0,
    }}
  >
    <Outlet />
  </main>

</div>

    </div>
  );
}

export default Admindashboard;
