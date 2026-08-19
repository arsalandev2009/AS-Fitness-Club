import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";
import './Skeleton.css'
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

      const { data, error } = await supabase.from("Auth").select("age,gender,role").eq("id", user.id).single();

      if (!error) {setUserData(data);}
       setLoading(false);
    };

    getUser();


      }, []);



  const location = useLocation();

                  if (loading) {
        return (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{
        minHeight: "100vh",
        background: "#0b0f0d",
        padding: "30px 15px",
    }}
>
    <div
        style={{
            width: "100%",
            maxWidth: "950px",
            background: "#111612",
            border: "1px solid #202820",
            borderRadius: "20px",
            padding: "30px",
        }}
    >
        {/* Profile Header */}
        <div className="d-flex align-items-center gap-3 mb-5">
            <div
                className="skeleton-dark"
                style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                }}
            />

            <div style={{ flex: 1 }}>
                <div
                    className="skeleton-dark mb-2"
                    style={{
                        width: "190px",
                        height: "20px",
                        borderRadius: "6px",
                    }}
                />

                <div
                    className="skeleton-dark"
                    style={{
                        width: "300px",
                        maxWidth: "70%",
                        height: "13px",
                        borderRadius: "5px",
                    }}
                />
            </div>
        </div>

        {/* Main Heading */}
        <div
            className="skeleton-dark mb-3"
            style={{
                width: "280px",
                height: "32px",
                borderRadius: "7px",
            }}
        />

        <div
            className="skeleton-dark mb-5"
            style={{
                width: "65%",
                height: "14px",
                borderRadius: "5px",
            }}
        />

        {/* Fitness Stats */}
        <div className="row g-3 mb-4">
            {[1, 2, 3].map((item) => (
                <div className="col-md-4" key={item}>
                    <div
                        style={{
                            background: "#151b16",
                            border: "1px solid #242d25",
                            borderRadius: "15px",
                            padding: "20px",
                        }}
                    >
                        <div
                            className="skeleton-dark mb-3"
                            style={{
                                width: "45px",
                                height: "45px",
                                borderRadius: "10px",
                            }}
                        />

                        <div
                            className="skeleton-dark mb-2"
                            style={{
                                width: "65%",
                                height: "18px",
                                borderRadius: "5px",
                            }}
                        />

                        <div
                            className="skeleton-dark"
                            style={{
                                width: "45%",
                                height: "13px",
                                borderRadius: "5px",
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>

        {/* AI Plan Section */}
        <div
            style={{
                background: "#151b16",
                border: "1px solid #242d25",
                borderRadius: "15px",
                padding: "25px",
            }}
        >
            <div
                className="skeleton-dark mb-4"
                style={{
                    width: "220px",
                    height: "22px",
                    borderRadius: "6px",
                }}
            />

            {[100, 90, 75, 95, 60].map((width, index) => (
                <div
                    key={index}
                    className="skeleton-dark mb-3"
                    style={{
                        width: `${width}%`,
                        height: "13px",
                        borderRadius: "5px",
                    }}
                />
            ))}
        </div>
    </div>
</div>
  );
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

        if(user && userData?.role === "coach"){
            return <Navigate to='/admin-dashboard' replace/>
        }
    }
    
    
    if (location.pathname === "/membercompleteprofile") {   
        if(!user){
            return <Navigate to={'/login'} replace/>;
        }
        if(user && !userData?.age && !userData?.gender && userData?.role === "member"){ 
            return children;
        }
        if(user && userData?.age && userData?.gender){
            return <Navigate to={'/member-dashboard'} replace/>;
        }  
        if(user && userData?.role === "coach"){
            return <Navigate to='/admin-dashboard' replace/>
        }
    }
    
    
    if (location.pathname === "/member-dashboard") {
        if(!user){
            return <Navigate to={'/login'} replace/>;
        }
        if(user && !userData?.age && !userData?.gender && userData?.role === "member"){ 
            return <Navigate to={'/membercompleteprofile'} replace/>;
        }
        if(user && userData?.age && userData?.gender){
            return children;
        } 
        if(user && userData?.role === "coach"){
            return <Navigate to='/admin-dashboard' replace/>
        }
    }
  return <div></div>;
}

export default ProtectedMemberPage;
