import React, { useEffect, useState } from 'react'
import { supabase } from '../../../../utils/supabase'

function Memberstore() {

  const [products,setProducts]=useState([])

  useEffect(()=>{
    const getProducts=async()=>{
    const {data,error}=await supabase.from('shop').select('*')
      if(!error){
        setProducts(data)
      }
    }
    getProducts()
  },[])
  return (
    <div>

     {products.map((item) => (
        <div key={item.id} className="card border-0 shadow" style={{ width: "150px", background: "#151515", borderRadius: "10px", overflow: "hidden", border: "1px solid #292929", }} >  
          <div style={{ position: "relative" }}>
            <img src={item.image} alt={item.name} style={{ width: "100%", height: "85px", objectFit: "cover", display: "block", }} />
            {/* <span style={{ position: "absolute", top: "6px", right: "6px", background: "#111", color: "#bfff00", fontSize: "8px", fontWeight: "700", padding: "3px 6px", borderRadius: "20px", border: "1px solid #bfff00", }} > Stock: {item.stock} </span>  */}
          </div>
          <div className="p-2">
            <p className="mb-1 fw-bold text-white" style={{ fontSize: "12px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", }} > {item.name} </p>
            <div className="d-flex gap-2 align-items-center mb-2">
              <span style={{ color: "#bfff00", fontSize: "12px", fontWeight: "700", }} > Rs. {item.price} </span>
              <span style={{ color: "#777", fontSize: "8px", }} > per item </span>
            </div>
            <p className="mb-2" style={{ color: "#999", fontSize: "9px", lineHeight: "1.35", height: "24px", overflow: "hidden", }} > {item.description} </p>    
            {/* <div className="d-flex gap-1">
              <button onClick={() => handleUpdateProductPopup(item)} className="btn btn-sm flex-grow-1" style={{ background: "#bfff00", color: "#111", border: "none", borderRadius: "5px", fontSize: "8px", fontWeight: "700", padding: "4px 2px", }} > Update </button>
              <button onClick={() => { setProductUpdate(item); setDeleteProductPopup(true); }} className="btn btn-sm flex-grow-1" style={{ background: "transparent", color: "#ff4d5a", border: "1px solid #ff4d5a", borderRadius: "5px", fontSize: "8px", fontWeight: "700", padding: "4px 2px", }} > Delete </button>  
            </div> */}
          </div>
        </div>
      ))}

    </div>
  )
}

export default Memberstore
