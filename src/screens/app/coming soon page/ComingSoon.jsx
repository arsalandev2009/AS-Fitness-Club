import React from "react";
import { FiArrowLeft, FiZap } from "react-icons/fi";
import Logo from "../../../assets/FitPlan_AI_Individual_Assets/logo.png";

function ComingSoon() {

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center text-white" style={{ backgroundColor: "#000", position: "relative", overflow: "hidden", }} >
      
      {/* Background Glow */}
      <div style={{ position: "absolute", width: "450px", height: "450px", background: "#bfff00", opacity: "0.08", filter: "blur(120px)", borderRadius: "50%", top: "-150px", right: "-100px", }} ></div>
     
      <div style={{ position: "absolute", width: "350px", height: "350px", background: "#bfff00", opacity: "0.06", filter: "blur(100px)", borderRadius: "50%", bottom: "-150px", left: "-100px", }} ></div>

      <div className="container text-center" style={{ position: "relative", zIndex: 2 }} >
        
        {/* Logo / Brand */}
        <div className="mb-4"> <img src={Logo} alt="AS Fitness club" width={200} /> </div>{" "}

        {/* Icon */}
        <div className="mx-auto mb-4 d-flex align-items-center justify-content-center" style={{ width: "75px", height: "75px", borderRadius: "20px", border: "1px solid rgba(191,255,0,0.5)", backgroundColor: "rgba(191,255,0,0.08)", boxShadow: "0 0 35px rgba(191,255,0,0.15)", }} > {" "} <FiZap size={35} style={{ color: "#bfff00" }} />{" "} </div>{" "}
        
        {/* Heading */}
        <h1 className="fw-bold mb-3" style={{ fontSize: "clamp(45px, 8vw, 90px)", lineHeight: "1", letterSpacing: "-3px", }} >{" "}COMING <br /> <span style={{ color: "#bfff00" }}>SOON.</span>{" "}</h1>{" "}
       
        {/* Description */}{" "}
        <p className="mx-auto text-secondary fs-5" style={{ maxWidth: "600px", lineHeight: "1.7" }} > {" "} We're building something powerful for your fitness journey. Your personalized fitness and nutrition experience is almost ready.{" "} </p>{" "}
       
        {/* Status */}{" "}
        <div className="d-flex justify-content-center mt-4 mb-4">
          <div className="d-flex align-items-center gap-2 px-4 py-2" style={{ border: "1px solid rgba(191,255,0,0.3)", borderRadius: "50px", backgroundColor: "rgba(191,255,0,0.05)", color: "#bfff00", }} > {" "} <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#bfff00", boxShadow: "0 0 10px #bfff00", }} ></span>{" "} <span>WORK IN PROGRESS</span>{" "}</div>{" "}
        </div>
      
        {/* Back Button */}{" "}
        <button onClick={() => window.history.back()} className="btn px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2" style={{ backgroundColor: "#bfff00", color: "#000", border: "none", borderRadius: "10px", }} > {" "} <FiArrowLeft /> Go Back{" "} </button>{" "}
       
        {/* Bottom Text */}{" "}
        <p className="mt-5 mb-0 text-secondary" style={{ fontSize: "13px" }}>© 2026 FitPlan AI — Train smarter. Eat better.{" "}</p>{" "}
     
      </div>
      
    </div>
  );
}
export default ComingSoon;
