import React, { useEffect, useState } from 'react'
import Logo from '../../../../assets/FitPlan_AI_Individual_Assets/logo.png'
import { supabase } from '../../../../utils/supabase'
import { useNavigate } from 'react-router-dom'

function Memberhome() {

const [prompt,setPrompt]=useState({})

  useEffect(()=>{
const getingPrompt = async()=>{

  const {data:{user},error:getError} = await supabase.auth.getUser()

  const {data,error}=await supabase.from('Auth').select('promptResult').eq("id",user.id).single()

  if(!error){
    setPrompt(data)
  }

}
getingPrompt()
  },[])



  const navigate = useNavigate()
  const handleLogout=async(e)=>{
e.preventDefault()
const {data,error}=await supabase.auth.signOut()
if(!error){
  navigate('/' ,{replace:true})
}
  }


  return (
    <div style={{backgroundColor:'black',height:'100dvh'}}>
      <header style={{padding:'20px',display:'flex',justifyContent:'space-between'}}>
        <img src={Logo} alt=""  width={250}/>
   <button
  onClick={handleLogout}
  className="btn fw-semibold px-4 py-2"
  style={{
    backgroundColor: "#bfff00",
    color: "#000",
    border: "none",
    borderRadius: "8px",
  }}
>
  Logout
</button>
      </header>

<div style={{color:'white',padding:'20px'}}>{prompt.promptResult}</div>

    </div>
  )
}

export default Memberhome
