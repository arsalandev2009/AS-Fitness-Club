import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { Navigate } from "react-router-dom";

function ProtectedRoutingMember({children}) {
const [user,setUser]=useState()
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const Protect = async () => {
      const { data:{user}, error } = await supabase.auth.getUser();
      setUser(user)
      setLoading(false);
    };
    Protect();
  }, []);

    if (loading) {
    return null;
  }

 if (user) {
    return <Navigate to="/member-dashboard" replace />;
  }

  return children;
}

export default ProtectedRoutingMember;
