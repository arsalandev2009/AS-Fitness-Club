import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";

function ProtectedMemberPage({children}) {


    const navigate=useNavigate()
const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {data: { user },error: getError} = await supabase.auth.getUser();
  if (getError || !user) {
      setUser(null); 
      setLoading(false);
      
      return;
    }
      if (!getError) {setUser(user);}

      const { data, error } = await supabase.from("Auth").select("age,gender").eq("id", user.id).single();

      if (!error) {setUserData(data);}
       setLoading(false);
    };

    getUser();


      }, []);



  const location = useLocation();

    if (loading) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }} >
                <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                    <span className="visually-hidden">Loading...</span>
                </div>

                <h5 className="mt-3">Checking your account...</h5>
                <p className="text-muted"> Please wait a moment</p>
            </div>
  );
}

    if (location.pathname === "/login") {
        if(!user){
            return children;
        }
        if(user && !userData?.age && !userData?.gender){

            return <Navigate to={'/membercompleteprofile'} replace/>;
        }
        if(user && userData?.age && userData?.gender){
            return <Navigate to={'/member-dashboard'} replace/>;
        }
    }


    if (location.pathname === "/membercompleteprofile") {   
        if(!user){
            return <Navigate to={'/login'} replace/>;
        }
        if(user && !userData?.age && !userData?.gender){ 
            return children;
        }
        if(user && userData?.age && userData?.gender){
            return <Navigate to={'/member-dashboard'} replace/>;
        }  
    }


    if (location.pathname === "/member-dashboard") {
        if(!user){
            return <Navigate to={'/login'} replace/>;
        }
        if(user && !userData?.age && !userData?.gender){ 
            return <Navigate to={'/membercompleteprofile'} replace/>;
        }
        if(user && userData?.age && userData?.gender){
            return children;
        } 
    }
  return <div></div>;
}

export default ProtectedMemberPage;
