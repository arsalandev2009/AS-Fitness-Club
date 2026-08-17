// import React, { useEffect, useState } from "react";
// import { supabase } from "../utils/supabase";
// import { Navigate } from "react-router-dom";

// function ProtectMemberHome({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [gettingData, setGettingData] = useState();

//   useEffect(() => {
//     async function checkUser() {
//       const { data, error } = await supabase.auth.getUser();

//       const { data: getData, error: getError } = await supabase
//         .from("Auth")
//         .select("age, gender")
//         .eq("id", data.user.id)
//         .single();
//       setGettingData(getData);

//       if (error) {
//         setUser(null);
//       } else {
//         setUser(data.user);
//       }

//       setLoading(false);
//     }

//     checkUser();
//   }, []);

//   if (loading) {
//     return null;
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
//   if (user && !gettingData.age && !gettingData.gender) {
//     return <Navigate to="/membercompleteprofile" replace />;
//   }

//   return children;
// }

// export default ProtectMemberHome;
