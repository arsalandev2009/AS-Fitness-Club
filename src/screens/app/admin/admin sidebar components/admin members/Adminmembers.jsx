import React, { useEffect, useState } from 'react'
import { supabase } from '../../../../../utils/supabase'

function Adminmembers() {
  const [members,setMembers]=useState([])

  useEffect(()=>{
    const fetchingMember=async()=>{ 
      const {data,error}=await supabase.from('Auth').select()
        if(error){
          console.log(error.message)
          return
        }
        const filterMember = data.filter((item)=>item.age && item.gender)  
        setMembers(filterMember)       
    }
    fetchingMember()
  },[])

  return (
    <div style={{ color: "white", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", padding: "10px", }} >
      {members.map((item) => (
        <div key={item.id} style={{ background: "#111", border: "1px solid #282828", borderRadius: "12px", padding: "18px", boxShadow: "0 5px 20px rgba(0,0,0,0.25)", transition: "0.2s ease", }} >

          <div style={{ fontSize: "18px", fontWeight: "700", color: "#fff", marginBottom: "14px", }} > {item.name} </div>
          <div style={{ display: "flex", gap: "10px", marginBottom: "14px", }} >
            <div style={{ background: "#181818", border: "1px solid #282828", borderRadius: "8px", padding: "8px 12px", flex: 1, }} > <small style={{ color: "#888", display: "block" }}> Age </small> <span style={{ color: "#bfff00", fontWeight: "600", }} > {item.age} </span> </div>
            <div style={{ background: "#181818", border: "1px solid #282828", borderRadius: "8px", padding: "8px 12px", flex: 1, }} > <small style={{ color: "#888", display: "block" }}> Gender </small> <span style={{ color: "#bfff00", fontWeight: "600", }} > {item.gender} </span> </div>
          </div>

          <div style={{ borderTop: "1px solid #282828", paddingTop: "12px", fontSize: "13px", color: "#888", }} > Joined At{" "} <span style={{ color: "#ccc" }}> {new Date(item.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", })} </span> </div>
        </div>
      ))}
  </div>
);
}

export default Adminmembers
