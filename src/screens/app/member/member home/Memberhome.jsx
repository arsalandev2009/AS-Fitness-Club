import React from 'react'
import Logo from '../../../../assets/FitPlan_AI_Individual_Assets/logo.png'
import { supabase } from '../../../../utils/supabase'
import { useNavigate } from 'react-router-dom'
function Memberhome() {

  const navigate = useNavigate()
  const handleLogout=async(e)=>{
e.preventDefault()
const {data,error}=await supabase.auth.signOut()
if(!error){
  navigate('/' ,{replace:true})
}
  }


  return (
    <div style={{backgroundColor:'black',height:'50dvh'}}>
      <header style={{padding:'20px',display:'flex',justifyContent:'space-between'}}>
        <img src={Logo} alt=""  width={250}/>
        <button onClick={handleLogout}>Logout</button>
      </header>
    </div>
  )
}

export default Memberhome
