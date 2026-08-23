import React, { useEffect, useState } from 'react'
import { supabase } from '../../../../../utils/supabase'
import { FaPlus, FaScaleUnbalanced } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

function Adminstore() {

  const [product,setProduct]=useState({image:'',name:'',price:'',description:'',stock:''})
  const [productUpdate,setProductUpdate]=useState({image:'',name:'',description:'',price:'',stock:''})

  const [addProductPopup,setAddProductPopup]=useState(false)
  const [updateProductPopup,setUpdateProductPopup]=useState(false)
  const [deleteProductPopup,setDeleteProductPopup]=useState(false)
  const [gotData,setGotData]=useState([])

  useEffect(()=>{
    const gettingData = async () => {
    const {data:getData,error:getError}= await supabase.from('shop').select()
      if(!getError){
        setGotData(getData)
      }      
    }
    gettingData()
  },[])


  const handleChange=(e)=>{setProduct({ ...product, [e.target.name]:e.target.value })}
  const handleChangeUpdate=(e)=>{setProductUpdate({ ...productUpdate, [e.target.name]:e.target.value })}

  const handleAddProductDone=async()=>{
  
    const {data,error}=await supabase.from('shop').insert({image:product.image,name:product.name,description:product.description,price:product.price,stock:product.stock})
    if(error){
      console.log(error.message)
      return;
    }   
    setAddProductPopup(false)
  }

  const handleUpdateProductPopup = (item) => {
    setProductUpdate({
      id: item.id,
      stock: item.stock,
      image: item.image,
      name: item.name,
      price: item.price,
      description: item.description,
    });
    setUpdateProductPopup(true);
  };

  const handleUpdateProductDone = async ()=>{
    const {data,error}=await supabase.from('shop').update({image:productUpdate.image,name:productUpdate.name,description:productUpdate.description,price:productUpdate.price,stock:productUpdate.stock}).eq("id",productUpdate.id).select()
    if(!error){
      console.log('done')
      setUpdateProductPopup(false)
      window.location.reload()
      return
    }
    // console.log(error)
  }
  
  const handleDeleteProductDone=async()=>{
  
    const {data,error}=await supabase.from('shop').delete().eq("id",productUpdate.id)
    if(!error){
      console.log(productUpdate.id+'done')
      setDeleteProductPopup(false)
      return
    }
    console.log(error)

  }

  return (
    <div className="d-flex flex-wrap gap-3 p-1">

      <style>
        {`  
          .form-control:-webkit-autofill,
          .form-control:-webkit-autofill:hover,
          .form-control:-webkit-autofill:focus,
          .form-control:-webkit-autofill:active {
            -webkit-text-fill-color: #fff !important;
            -webkit-box-shadow: 0 0 0px 1000px #181818 inset !important;
            box-shadow: 0 0 0px 1000px #181818 inset !important;
            background-color: #181818 !important;
            border: 1px solid #282828 !important;
            caret-color: #fff;
          }
        `}
      </style>

      {gotData.map((item) => (
        <div key={item.id} className="card border-0 shadow" style={{ width: "150px", background: "#151515", borderRadius: "10px", overflow: "hidden", border: "1px solid #292929", }} >  
          <div style={{ position: "relative" }}>
            <img src={item.image} alt={item.name} style={{ width: "100%", height: "85px", objectFit: "cover", display: "block", }} />
            <span style={{ position: "absolute", top: "6px", right: "6px", background: "#111", color: "#bfff00", fontSize: "8px", fontWeight: "700", padding: "3px 6px", borderRadius: "20px", border: "1px solid #bfff00", }} > Stock: {item.stock} </span> 
          </div>
          <div className="p-2">
            <p className="mb-1 fw-bold text-white" style={{ fontSize: "12px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", }} > {item.name} </p>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span style={{ color: "#bfff00", fontSize: "12px", fontWeight: "700", }} > Rs. {item.price} </span>
              <span style={{ color: "#777", fontSize: "8px", }} > per item </span>
            </div>
            <p className="mb-2" style={{ color: "#999", fontSize: "9px", lineHeight: "1.35", height: "24px", overflow: "hidden", }} > {item.description} </p>    
            <div className="d-flex gap-1">
              <button onClick={() => handleUpdateProductPopup(item)} className="btn btn-sm flex-grow-1" style={{ background: "#bfff00", color: "#111", border: "none", borderRadius: "5px", fontSize: "8px", fontWeight: "700", padding: "4px 2px", }} > Update </button>
              <button onClick={() => { setProductUpdate(item); setDeleteProductPopup(true); }} className="btn btn-sm flex-grow-1" style={{ background: "transparent", color: "#ff4d5a", border: "1px solid #ff4d5a", borderRadius: "5px", fontSize: "8px", fontWeight: "700", padding: "4px 2px", }} > Delete </button>  
            </div>
          </div>
        </div>
      ))}

      <button onClick={()=>{setAddProductPopup(true)}} className="btn border-0 shadow-sm rounded-3 p-0 overflow-hidden" style={{ width: "150px",  backgroundColor: "#111", color: "#fff", }} >
        <div className="d-flex flex-column justify-content-center align-items-center h-100 p-4">
          <FaPlus color='#bfff00' size={35}/> <br />
          <span className="fw-bold fs-6"> Add New Product </span>
        </div>
      </button>
      
       {addProductPopup && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.75)", zIndex: 1050, padding: "20px", }} >
          <form onSubmit={handleAddProductDone} className="p-4 rounded-4 shadow-lg" style={{ backgroundColor: "#111", border: "1px solid #282828", width: "100%", maxWidth: "500px", maxHeight: "90vh", overflowY: "auto", }} >
            <h4 className="d-flex justify-content-between fw-bold text-white mb-4"> <p> Add Product </p> <p style={{cursor:'pointer'}} onClick={()=>{setAddProduct(false)}}><IoClose/></p> </h4>
   
            <div className="mb-3">
              <label className="form-label text-white fw-semibold"> Image URL </label>
              <input type="text" placeholder="Enter image URL" value={product.image} name="image" onChange={handleChange} required className="form-control text-white" style={{ backgroundColor: "#181818", border: "1px solid #282828", color: "white", }} />
            </div>

            <div className="mb-3">
              <label className="form-label text-white fw-semibold"> Product Name </label>
              <input type="text" placeholder="Enter product name" value={product.name} name="name" onChange={handleChange} required className="form-control text-white" style={{ backgroundColor: "#181818", border: "1px solid #282828", color: "white", }} />
            </div>

            <div className="mb-3">
              <label className="form-label text-white fw-semibold"> Description </label>
              <textarea placeholder="Enter product description" value={product.description} name="description" onChange={handleChange} required rows="4" className="form-control text-white" style={{ backgroundColor: "#181818", border: "1px solid #282828", color: "white", }} />
            </div>

            <div className="mb-4">
              <label className="form-label text-white fw-semibold"> Price </label>
              <input type="number" placeholder="Enter price" value={product.price} name="price" onChange={handleChange} required className="form-control text-white" style={{ backgroundColor: "#181818", border: "1px solid #282828", color: "white", }} />
            </div>

            <div className="mb-4">
              <label className="form-label text-white fw-semibold"> Stock </label>
              <input type="number" placeholder="Enter Your Stock Quantity" value={product.stock} name="stock" onChange={handleChange} required className="form-control text-white" style={{ backgroundColor: "#181818", border: "1px solid #282828", color: "white", }} />
            </div>

            <button type="submit" className="btn w-100 fw-bold py-2" style={{ backgroundColor: "#bfff00", color: "#000", border: "none", }} > Add Product </button>
          </form>
        </div>
      )}

      {updateProductPopup && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.75)", zIndex: 1050, padding: "20px", }} >
          <form  className="p-4 rounded-4 shadow-lg" style={{ backgroundColor: "#111", border: "1px solid #282828", width: "100%", maxWidth: "500px", maxHeight: "90vh", overflowY: "auto", }} >
            <h4 className="d-flex justify-content-between fw-bold text-white mb-4"> <p> Update Product </p> <p style={{cursor:'pointer'}} onClick={()=>{setUpdateProductPopup(false)}}><IoClose/></p> </h4>
   
            <div className="mb-3">
              <label className="form-label text-white fw-semibold"> Image URL </label>
              <input type="text" placeholder="Enter image URL" value={productUpdate.image} name="image" onChange={handleChangeUpdate} required className="form-control text-white" style={{ backgroundColor: "#181818", border: "1px solid #282828", color: "white", }} />
            </div>

            <div className="mb-3">
              <label className="form-label text-white fw-semibold"> Product Name </label>
              <input type="text" placeholder="Enter product name" value={productUpdate.name} name="name" onChange={handleChangeUpdate} required className="form-control text-white" style={{ backgroundColor: "#181818", border: "1px solid #282828", color: "white", }} />
            </div>

            <div className="mb-3">
              <label className="form-label text-white fw-semibold"> Description </label>
              <textarea placeholder="Enter product description" value={productUpdate.description} name="description" onChange={handleChangeUpdate} required rows="4" className="form-control text-white" style={{ backgroundColor: "#181818", border: "1px solid #282828", color: "white", }} />
            </div>

            <div className="mb-4">
              <label className="form-label text-white fw-semibold"> Price </label>
              <input type="number" placeholder="Enter price" value={productUpdate.price} name="price" onChange={handleChangeUpdate} required className="form-control text-white" style={{ backgroundColor: "#181818", border: "1px solid #282828", color: "white", }} />
            </div>

            <div className="mb-4">
              <label className="form-label text-white fw-semibold"> Stock </label>
              <input type="number" placeholder="Enter Stock Quantity" value={productUpdate.stock} name="stock" onChange={handleChangeUpdate} required className="form-control text-white" style={{ backgroundColor: "#181818", border: "1px solid #282828", color: "white", }} />
            </div>

            <button type='button' onClick={handleUpdateProductDone} className="btn w-100 fw-bold py-2" style={{ backgroundColor: "#bfff00", color: "#000", border: "none", }} > Update Product </button>
          </form>
        </div>
      )}

      {deleteProductPopup && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.75)", zIndex: 1050, padding: "20px", }} >
          <form onSubmit={handleDeleteProductDone} className="p-4 rounded-4 shadow-lg" style={{ backgroundColor: "#111", border: "1px solid #282828", width: "100%", maxWidth: "500px", maxHeight: "90vh", overflowY: "auto", }} >
            <h4 className="d-flex justify-content-between fw-bold text-white mb-4"> <p> Delete Product </p> <p style={{cursor:'pointer'}} onClick={()=>{setDeleteProductPopup(false)}}><IoClose/></p> </h4>
   

            <button type="submit" className="btn w-100 fw-bold py-2" style={{ backgroundColor: "#bfff00", color: "#000", border: "none", }} > Delete Product </button>
          </form>
        </div>
      )}
     
    </div>
  )
}

export default Adminstore




