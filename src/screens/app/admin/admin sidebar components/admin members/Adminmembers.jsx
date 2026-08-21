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
    }else{
      console.log(data)
      setMembers(data)
    }
      

    }
    fetchingMember()
  },[])

  return (
    <div style={{color:'white',display:'flex',gap:'10px'}}>
      {members.map ((item)=>(

        <div key={item.id} className='text-white border d-flex flex-column p-2'>
        <div>{item.name}</div>
        <div>{new Date(item.created_at).toLocaleTimeString("en-US",{hour:'numeric',minute:'2-digit'})}</div>
        <div>{new Date(item.created_at).toLocaleDateString("en-GB",{day:'numeric',month:'short',year:'numeric'})}</div>
        </div>

      ))}
    </div>
  )
}

export default Adminmembers
