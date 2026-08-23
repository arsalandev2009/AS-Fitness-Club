import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";
import {LoginSkeleton, MemberCompleteprofileSkeleton, MemberDashboardSkeleton} from '../skeleton/skeleton'
// import './Skeleton.css'

function ProtectedMemberPage({children}) {


    
const [user, setUser] = useState(null);
const [adminData,setAdminData]=useState()
const [userData, setUserData] = useState();

const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getUser = async () => {
      const {data: { user },error: getError} = await supabase.auth.getUser();

     if (getError || !user) {
      setUser(null); 
      setUserData(null);
      setAdminData(null)
      setLoading(false);
      return;
    }
      setUser(user)

    const [userResult, adminResult] = await Promise.all([

      supabase
        .from("Auth")
        .select("age, gender, role")
        .eq("id", user.id)
        .maybeSingle(),

      supabase
        .from("adminAuth")
        .select("role")
        .eq("id", user.id)
        .maybeSingle()

    ]);

    // User Data
    if (!userResult.error) {
      setUserData(userResult.data);
    }

    // Admin Data
    if (!adminResult.error) {
      setAdminData(adminResult.data);
    }

    // Dono queries complete hone ke baad
    setLoading(false);
  };

    getUser();


      },[] );



  const location = useLocation();

// if (loading) {
//         return (
//   <div
//     className="d-flex justify-content-center align-items-center"
//     style={{
//         minHeight: "100vh",
//         background: "#0b0f0d",
//         padding: "30px 15px",
//     }}
// >
//     <div
//         style={{
//             width: "100%",
//             maxWidth: "950px",
//             background: "#111612",
//             border: "1px solid #202820",
//             borderRadius: "20px",
//             padding: "30px",
//         }}
//     >
//         {/* Profile Header */}
//         <div className="d-flex align-items-center gap-3 mb-5">
//             <div
//                 className="skeleton-dark"
//                 style={{
//                     width: "60px",
//                     height: "60px",
//                     borderRadius: "50%",
//                 }}
//             />

//             <div style={{ flex: 1 }}>
//                 <div
//                     className="skeleton-dark mb-2"
//                     style={{
//                         width: "190px",
//                         height: "20px",
//                         borderRadius: "6px",
//                     }}
//                 />

//                 <div
//                     className="skeleton-dark"
//                     style={{
//                         width: "300px",
//                         maxWidth: "70%",
//                         height: "13px",
//                         borderRadius: "5px",
//                     }}
//                 />
//             </div>
//         </div>

//         {/* Main Heading */}
//         <div
//             className="skeleton-dark mb-3"
//             style={{
//                 width: "280px",
//                 height: "32px",
//                 borderRadius: "7px",
//             }}
//         />

//         <div
//             className="skeleton-dark mb-5"
//             style={{
//                 width: "65%",
//                 height: "14px",
//                 borderRadius: "5px",
//             }}
//         />

//         {/* Fitness Stats */}
//         <div className="row g-3 mb-4">
//             {[1, 2, 3].map((item) => (
//                 <div className="col-md-4" key={item}>
//                     <div
//                         style={{
//                             background: "#151b16",
//                             border: "1px solid #242d25",
//                             borderRadius: "15px",
//                             padding: "20px",
//                         }}
//                     >
//                         <div
//                             className="skeleton-dark mb-3"
//                             style={{
//                                 width: "45px",
//                                 height: "45px",
//                                 borderRadius: "10px",
//                             }}
//                         />

//                         <div
//                             className="skeleton-dark mb-2"
//                             style={{
//                                 width: "65%",
//                                 height: "18px",
//                                 borderRadius: "5px",
//                             }}
//                         />

//                         <div
//                             className="skeleton-dark"
//                             style={{
//                                 width: "45%",
//                                 height: "13px",
//                                 borderRadius: "5px",
//                             }}
//                         />
//                     </div>
//                 </div>
//             ))}
//         </div>

//         {/* AI Plan Section */}
//         <div
//             style={{
//                 background: "#151b16",
//                 border: "1px solid #242d25",
//                 borderRadius: "15px",
//                 padding: "25px",
//             }}
//         >
//             <div
//                 className="skeleton-dark mb-4"
//                 style={{
//                     width: "220px",
//                     height: "22px",
//                     borderRadius: "6px",
//                 }}
//             />

//             {[100, 90, 75, 95, 60].map((width, index) => (
//                 <div
//                     key={index}
//                     className="skeleton-dark mb-3"
//                     style={{
//                         width: `${width}%`,
//                         height: "13px",
//                         borderRadius: "5px",
//                     }}
//                 />
//             ))}
//         </div>
//     </div>
// </div>
//   );
// }

if (loading) {
  if (location.pathname === "/login") {
    return <LoginSkeleton/>;
  }

  if (location.pathname === "/membercompleteprofile") {
    return     <MemberCompleteprofileSkeleton/>
  }

  if (location.pathname === "/member-dashboard") {

    return  <MemberDashboardSkeleton/>
  }

  return null;
}

    if (location.pathname === "/login") {          
        
        if(!user){
            return children;
        }
        if(user && !userData?.age && !userData?.gender && userData?.role === "member"){

            return <Navigate to={'/membercompleteprofile'} replace/>;
        }
        if(user && userData?.age && userData?.gender){
            return <Navigate to={'/member-dashboard'} replace/>;
        }

        if(user && adminData?.role === "coach"){
            return  <Navigate to='/admin-dashboard' replace/>
        }
    }
    
    
    if (location.pathname === "/membercompleteprofile") {   

//           if(loading){
//             <div className="bg-black text-white min-vh-100">

//  {/* NAVBAR */}
//       <nav className="border-bottom border-secondary px-3 px-md-4 py-3">
//         <div className="container-fluid d-flex justify-content-between align-items-center">
//           <div
//             className="placeholder-glow"
//             style={{ width: "155px", height: "35px" }}
//           >
//             <span className="placeholder w-100 h-100 rounded"></span>
//           </div>

//           <div
//             className="placeholder-glow"
//             style={{ width: "90px", height: "38px" }}
//           >
//             <span className="placeholder w-100 h-100 rounded"></span>
//           </div>
//         </div>
//       </nav>

//       {/* HEADER */}
//       <div className="container text-center py-4">
//         <div className="placeholder-glow">
//           <span
//             className="placeholder col-5 col-md-3 rounded"
//             style={{ height: "38px" }}
//           ></span>
//         </div>

//         <div className="placeholder-glow mt-2">
//           <span
//             className="placeholder col-8 col-md-4 rounded"
//             style={{ height: "18px" }}
//           ></span>
//         </div>
//       </div>

//       {/* MAIN */}
//       <div className="container">

//         {/* GROCERY */}
//         <section className="mb-5">

//           <div className="placeholder-glow mb-3">
//             <span
//               className="placeholder col-5 col-md-2 rounded"
//               style={{ height: "28px" }}
//             ></span>
//           </div>

//           <div className="row g-3">

//             {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
//               <div className="col-12 col-md-6 col-lg-4" key={item}>
//                 <div
//                   className="card bg-dark border-secondary placeholder-glow"
//                   style={{ height: "74px" }}
//                 >
//                   <div className="card-body py-3">
//                     <span className="placeholder col-4"></span>
//                     <br />
//                     <span className="placeholder col-2 mt-2"></span>
//                   </div>
//                 </div>
//               </div>
//             ))}

//           </div>

//           {/* SHOP BUTTON */}
//           <div className="d-flex justify-content-center justify-content-md-end mt-4">
//             <div
//               className="placeholder-glow"
//               style={{ width: "215px", height: "40px" }}
//             >
//               <span className="placeholder w-100 h-100 rounded"></span>
//             </div>
//           </div>

//         </section>


//         {/* DAILY NUTRITION */}
//         <section className="mb-5">

//           <div className="placeholder-glow mb-3">
//             <span
//               className="placeholder col-7 col-md-3 rounded"
//               style={{ height: "28px" }}
//             ></span>
//           </div>

//           {/* TOP NUTRITION CARDS */}
//           <div className="row g-3">

//             {[1, 2, 3, 4].map((item) => (
//               <div className="col-12 col-sm-6 col-lg-3" key={item}>
//                 <div
//                   className="card bg-dark border-secondary placeholder-glow"
//                   style={{ height: "125px" }}
//                 >
//                   <div className="card-body text-center">

//                     <span className="placeholder col-4"></span>

//                     <div className="mt-3">
//                       <span
//                         className="placeholder col-5"
//                         style={{ height: "28px" }}
//                       ></span>
//                     </div>

//                     <div className="mt-2">
//                       <span className="placeholder col-3"></span>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             ))}

//           </div>


//           {/* MACROS */}
//           <div className="row g-3 mt-2">

//             {[1, 2, 3].map((item) => (
//               <div className="col-12 col-md-4" key={item}>
//                 <div
//                   className="card bg-dark border-secondary placeholder-glow"
//                   style={{ height: "90px" }}
//                 >
//                   <div className="card-body">

//                     <div className="d-flex justify-content-between">
//                       <span className="placeholder col-4"></span>
//                       <span className="placeholder col-2"></span>
//                     </div>

//                     <div className="progress mt-3">
//                       <div className="placeholder w-100 h-100"></div>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             ))}

//           </div>

//         </section>

//       </div>
//     </div> 
//         }

        if(!user){
            return <Navigate to={'/login'} replace/>;
        }
        if(user && !userData?.age && !userData?.gender && userData?.role === "member"){ 
            return children;
        }
        if(user && userData?.age && userData?.gender){
            return <Navigate to={'/member-dashboard'} replace/>;
        }  
        if(user && adminData?.role === "coach"){
            return <Navigate to='/admin-dashboard' replace/>
        }
    }
    
    
    if (location.pathname === "/member-dashboard") {

//         if(loading){
//             <div className="bg-black text-white min-vh-100">

//  {/* NAVBAR */}
//       <nav className="border-bottom border-secondary px-3 px-md-4 py-3">
//         <div className="container-fluid d-flex justify-content-between align-items-center">
//           <div
//             className="placeholder-glow"
//             style={{ width: "155px", height: "35px" }}
//           >
//             <span className="placeholder w-100 h-100 rounded"></span>
//           </div>

//           <div
//             className="placeholder-glow"
//             style={{ width: "90px", height: "38px" }}
//           >
//             <span className="placeholder w-100 h-100 rounded"></span>
//           </div>
//         </div>
//       </nav>

//       {/* HEADER */}
//       <div className="container text-center py-4">
//         <div className="placeholder-glow">
//           <span
//             className="placeholder col-5 col-md-3 rounded"
//             style={{ height: "38px" }}
//           ></span>
//         </div>

//         <div className="placeholder-glow mt-2">
//           <span
//             className="placeholder col-8 col-md-4 rounded"
//             style={{ height: "18px" }}
//           ></span>
//         </div>
//       </div>

//       {/* MAIN */}
//       <div className="container">

//         {/* GROCERY */}
//         <section className="mb-5">

//           <div className="placeholder-glow mb-3">
//             <span
//               className="placeholder col-5 col-md-2 rounded"
//               style={{ height: "28px" }}
//             ></span>
//           </div>

//           <div className="row g-3">

//             {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
//               <div className="col-12 col-md-6 col-lg-4" key={item}>
//                 <div
//                   className="card bg-dark border-secondary placeholder-glow"
//                   style={{ height: "74px" }}
//                 >
//                   <div className="card-body py-3">
//                     <span className="placeholder col-4"></span>
//                     <br />
//                     <span className="placeholder col-2 mt-2"></span>
//                   </div>
//                 </div>
//               </div>
//             ))}

//           </div>

//           {/* SHOP BUTTON */}
//           <div className="d-flex justify-content-center justify-content-md-end mt-4">
//             <div
//               className="placeholder-glow"
//               style={{ width: "215px", height: "40px" }}
//             >
//               <span className="placeholder w-100 h-100 rounded"></span>
//             </div>
//           </div>

//         </section>


//         {/* DAILY NUTRITION */}
//         <section className="mb-5">

//           <div className="placeholder-glow mb-3">
//             <span
//               className="placeholder col-7 col-md-3 rounded"
//               style={{ height: "28px" }}
//             ></span>
//           </div>

//           {/* TOP NUTRITION CARDS */}
//           <div className="row g-3">

//             {[1, 2, 3, 4].map((item) => (
//               <div className="col-12 col-sm-6 col-lg-3" key={item}>
//                 <div
//                   className="card bg-dark border-secondary placeholder-glow"
//                   style={{ height: "125px" }}
//                 >
//                   <div className="card-body text-center">

//                     <span className="placeholder col-4"></span>

//                     <div className="mt-3">
//                       <span
//                         className="placeholder col-5"
//                         style={{ height: "28px" }}
//                       ></span>
//                     </div>

//                     <div className="mt-2">
//                       <span className="placeholder col-3"></span>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             ))}

//           </div>


//           {/* MACROS */}
//           <div className="row g-3 mt-2">

//             {[1, 2, 3].map((item) => (
//               <div className="col-12 col-md-4" key={item}>
//                 <div
//                   className="card bg-dark border-secondary placeholder-glow"
//                   style={{ height: "90px" }}
//                 >
//                   <div className="card-body">

//                     <div className="d-flex justify-content-between">
//                       <span className="placeholder col-4"></span>
//                       <span className="placeholder col-2"></span>
//                     </div>

//                     <div className="progress mt-3">
//                       <div className="placeholder w-100 h-100"></div>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             ))}

//           </div>

//         </section>

//       </div>
//     </div> 
//         }

        if(!user){
            return <Navigate to={'/login'} replace/>;
        }
        if(user && !userData?.age && !userData?.gender && userData?.role === "member"){ 
            return <Navigate to={'/membercompleteprofile'} replace/>;
        }
        if(user && userData?.age && userData?.gender){
            return children;
        } 
        if(user && adminData?.role === "coach"){
            return <Navigate to='/admin-dashboard' replace/>
        }
    }
  return <div></div>;
}

export default ProtectedMemberPage;
