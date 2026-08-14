import React, { useState } from "react";
import { supabase } from "../../../utils/supabase";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FiSend } from "react-icons/fi";

function ForgetPassword() {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://asdietplan.vercel.app/updatepassword",
    });

    if (error) {
      alert(error.message);
      return;
    } else {
      Swal.fire({
        title: "Check Your Email",
        text: "A password reset link has been sent to your email.",
        icon: "success",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center text-white"
      style={{
        backgroundColor: "#000",
        padding: "30px 15px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "rgba(191,255,0,0.06)",
          filter: "blur(100px)",
          borderRadius: "50%",
          top: "-150px",
          left: "-150px",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          background: "rgba(191,255,0,0.05)",
          filter: "blur(100px)",
          borderRadius: "50%",
          bottom: "-150px",
          right: "-100px",
        }}
      />

      <div
        className="w-100"
        style={{
          maxWidth: "420px",
          position: "relative",
          zIndex: 2,
        }}
      >

        {/* Brand */}
        <div className="text-center mb-4">
          <h3
            className="fw-bold mb-1"
            style={{
              fontSize: "24px",
              letterSpacing: "-0.5px",
            }}
          >
            <span style={{ color: "#bfff00" }}>FP</span>{" "}
            FitPlan AI
          </h3>

          <p
            className="mb-0"
            style={{
              color: "#666",
              fontSize: "11px",
              letterSpacing: "0.5px",
            }}
          >
            AI-POWERED FITNESS COMPANION
          </p>
        </div>

        {/* Card */}
        <div
          className="p-4 p-sm-5"
          style={{
            backgroundColor: "#090909",
            border: "1px solid #292929",
            borderRadius: "14px",
            boxShadow: "0 15px 50px rgba(0,0,0,0.5)",
          }}
        >
          <form onSubmit={handleSubmit}>

            {/* Heading */}
            <div className="text-center mb-4">
              <h2
                className="fw-bold mb-2"
                style={{
                  fontSize: "27px",
                }}
              >
                Reset Your{" "}
                <span style={{ color: "#bfff00" }}>
                  Password.
                </span>
              </h2>

              <p
                className="mb-0"
                style={{
                  color: "#777",
                  fontSize: "13px",
                }}
              >
                Enter your email and we'll send you a reset link.
              </p>
            </div>

            {/* Email */}
            <div className="mb-4">
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
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>

            {/* Send Button */}
            <button
              type="submit"
              className="btn w-100 fw-bold"
              style={{
                backgroundColor: "#bfff00",
                color: "#000",
                height: "45px",
                borderRadius: "6px",
                border: "none",
                fontSize: "13px",
              }}
            >
              Send Reset Link <FiSend/>
            </button>

            {/* Login */}
            <div className="text-center mt-4">
              <p
                className="mb-0"
                style={{
                  color: "#777",
                  fontSize: "12px",
                }}
              >
                Did You Remember the Password?{" "}

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

        {/* Bottom */}
        <p
          className="text-center mt-4 mb-0"
          style={{
            color: "#444",
            fontSize: "10px",
          }}
        >
          Your data is secure and protected.
        </p>

      </div>

      {/* Input CSS */}
      <style>
        {`
          .fitplan-input {
            background-color: #111 !important;
            color: #fff !important;
            border: 1px solid #292929 !important;
            height: 40px;
            font-size: 13px !important;
          }

          .fitplan-input::placeholder {
            color: #555 !important;
          }

          .fitplan-input:focus {
            background-color: #111 !important;
            color: #fff !important;
            border-color: #bfff00 !important;
            box-shadow: 0 0 0 0.15rem rgba(191, 255, 0, 0.1) !important;
          }
        `}
      </style>
    </div>
  );
}

export default ForgetPassword;