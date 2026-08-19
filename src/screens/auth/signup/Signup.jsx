import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../utils/supabase";
import Logo from '../../../assets/FitPlan_AI_Individual_Assets/logo.png'
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiSend } from "react-icons/fi";

function Signup() {
  const navigate = useNavigate();

  const [passwordsee, setPasswordsee] = useState(false);
  const [confirmpasswordsee, setConfirmPasswordsee] = useState(false);

  const [signupData, setSignupData] = useState({
    role: "member",
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    setSignupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmpassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match.",
      });
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: signupData.email,
      password: signupData.password,
    });

    if (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
      return;
    }

    await supabase.from("Auth").insert({
      id: data.user.id,
      name: signupData.name,
      Email: signupData.email,
      role: signupData.role,
    });

    Swal.fire({
      title: "Signup Successful!",
      text: "Your account has been created successfully.",
      icon: "success",
      confirmButtonText: "OK!",
      confirmButtonColor: "#0d6efd",
    }).then(async () => {
       await supabase.auth.signOut();
      navigate("/login");
    });
  };

  return (
    <>
      <div
        className="min-vh-100 d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "#000",
          color: "#fff",
          overflow: "hidden",
          padding: "30px 15px",
        }}
      >
        {/* Glow Effects */}
        <div
          style={{
            position: "fixed",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "#bfff00",
            opacity: "0.04",
            filter: "blur(100px)",
            top: "5%",
            left: "5%",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "fixed",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "#bfff00",
            opacity: "0.04",
            filter: "blur(100px)",
            bottom: "5%",
            right: "5%",
            pointerEvents: "none",
          }}
        />

        <div
          className="w-100"
          style={{
            maxWidth: "480px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Brand */}
          <div className="text-center mb-4">
            <div
             className="py-1"
              
            >
            <img src={Logo} alt="AS Fitness" width={150}/>
            </div>

            <p
              className="mb-0"
              style={{
                color: "#777",
                fontSize: "13px",
              }}
            >
              AI-POWERED FITNESS COMPANION
            </p>
          </div>

          {/* Signup Card */}
          <div
            className="p-4 p-sm-5"
            style={{
              backgroundColor: "#080808",
              border: "1px solid #252525",
              borderRadius: "14px",
              boxShadow: "0 0 50px rgba(191,255,0,0.04)",
            }}
          >
            <div className="text-center mb-4">
              <h2
                className="fw-bold mb-2"
                style={{
                  fontSize: "30px",
                  color: "#fff",
                }}
              >
                Create Your <span style={{ color: "#bfff00" }}>Account.</span>
              </h2>

              <p
                className="mb-0"
                style={{
                  color: "#777",
                  fontSize: "14px",
                }}
              >
                Create your account and start your journey.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Role */}
              {/* <div className="mb-3">
                <label
                  className="form-label"
                  style={{
                    color: "#ddd",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  Select Your Role
                </label>

                <select
                  name="role"
                  className="form-select fitplan-input"
                  value={signupData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Your Role</option>
                  <option value="coach">Coach</option>
                  <option value="member">Member</option>
                </select>
              </div> */}

              {/* Full Name */}
              <div className="mb-3">
                <label
                  className="form-label"
                  style={{
                    color: "#ddd",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control fitplan-input"
                  value={signupData.name}
                  onChange={handleChange}
                  placeholder="Enter Your FullName"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label
                  className="form-label"
                  style={{
                    color: "#ddd",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control fitplan-input"
                  value={signupData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email Address"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label
                  className="form-label"
                  style={{
                    color: "#ddd",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  Password
                </label>

                <div className="input-group">
                  <input
                    type={passwordsee ? "text" : "password"}
                    name="password"
                    className="form-control fitplan-input"
                    value={signupData.password}
                    onChange={handleChange}
                    placeholder="Enter Your Password"
                    required
                  />

                  <span
                    className="input-group-text fitplan-eye"
                    onClick={() => setPasswordsee(!passwordsee)}
                  >
                    {passwordsee ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label
                  className="form-label"
                  style={{
                    color: "#ddd",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  Confirm Password
                </label>

                <div className="input-group">
                  <input
                    type={confirmpasswordsee ? "text" : "password"}
                    name="confirmpassword"
                    className="form-control fitplan-input"
                    value={signupData.confirmpassword}
                    onChange={handleChange}
                    placeholder="Re-Enter Your Password"
                    required
                  />

                  <span
                    className="input-group-text fitplan-eye"
                    onClick={() => setConfirmPasswordsee(!confirmpasswordsee)}
                  >
                    {confirmpasswordsee ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                className="btn w-100 fw-bold fitplan-signup-btn"
              >
                Create Account <FiSend />
              </button>

              {/* Login */}
              <div className="text-center mt-4">
                <p
                  className="mb-0"
                  style={{
                    color: "#777",
                    fontSize: "13px",
                  }}
                >
                  Already have an account? {""}
                  <Link
                    to="/login"
                    style={{
                      color: "#bfff00",
                      textDecoration: "none",
                      fontWeight: "600",
                    }}
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Bottom text */}
          <p
            className="text-center mt-4 mb-0"
            style={{
              color: "#444",
              fontSize: "11px",
            }}
          >
            Your data is secure and protected.
          </p>
        </div>
      </div>

      {/* Theme CSS */}
      <style>
        {`

          .fitplan-input {
            background-color: #111 !important;
            border: 1px solid #292929 !important;
            color: #fff !important;
            min-height: 46px;
            font-size: 13px;
          }

          .fitplan-input::placeholder {
            color: #555 !important;
          }

          .fitplan-input:focus {
            background-color: #111 !important;
            border-color: #bfff00 !important;
            color: #fff !important;
            box-shadow: 0 0 0 0.15rem rgba(191, 255, 0, 0.08) !important;
          }

          .fitplan-input option {
            background-color: #111;
            color: #fff;
          }

          .fitplan-eye {
            background-color: #111 !important;
            border: 1px solid #292929 !important;
            color: #777 !important;
            cursor: pointer;
          }

          .fitplan-eye:hover {
            color: #bfff00 !important;
          }

          .fitplan-signup-btn {
            min-height: 48px;
            background-color: #bfff00 !important;
            color: #000 !important;
            border: none !important;
            border-radius: 6px;
            transition: 0.2s;
          }

          .fitplan-signup-btn:hover {
            background-color: #bfff00 !important;
            color: #000 !important;
            transform: translateY(-1px);
            box-shadow: 0 8px 25px rgba(191, 255, 0, 0.12);
          }

          @media (max-width: 400px) {

            .fitplan-input {
              min-height: 44px;
            }

          }

        `}
      </style>
    </>
  );
}

export default Signup;
