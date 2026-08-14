import React, { useState } from "react";
import { supabase } from "../../../utils/supabase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function UpdatePassword() {
  const [passwordsee, setPasswordsee] = useState(false);
  const [confirmpasswordsee, setConfirmPasswordsee] = useState(false);

  const navigate = useNavigate();

  const [update, setUpdate] = useState({
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    setUpdate((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (update.password !== update.confirmpassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match.",
      });
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: update.password,
    });

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
      return;
    }

    Swal.fire({
      title: "Password Changed",
      text: "Your account password has been changed successfully.",
      icon: "success",
      confirmButtonText: "Login",
      confirmButtonColor: "#0d6efd",
    }).then(() => {
      navigate("/login");
    });
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
          <h2
            className="text-center fw-bold mb-2"
            style={{
              fontSize: "27px",
            }}
          >
            Update Your{" "}
            <span style={{ color: "#bfff00" }}>
              Password.
            </span>
          </h2>

          <p
            className="text-center mb-4"
            style={{
              color: "#777",
              fontSize: "13px",
            }}
          >
            Create a new secure password for your account.
          </p>

          <form onSubmit={handleSubmit}>

            {/* New Password */}
            <div className="mb-3">
              <label
                className="form-label"
                style={{
                  color: "#ddd",
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              >
                Enter New Password
              </label>

              <div className="input-group">
                <input
                  type={passwordsee ? "text" : "password"}
                  name="password"
                  className="form-control fitplan-input"
                  value={update.password}
                  onChange={handleChange}
                  placeholder="Enter New Password"
                  required
                />

                <span
                  className="input-group-text fitplan-eye"
                  style={{ cursor: "pointer" }}
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
                Confirm New Password
              </label>

              <div className="input-group">
                <input
                  type={confirmpasswordsee ? "text" : "password"}
                  name="confirmpassword"
                  className="form-control fitplan-input"
                  value={update.confirmpassword}
                  onChange={handleChange}
                  placeholder="Confirm New Password"
                  required
                />

                <span
                  className="input-group-text fitplan-eye"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setConfirmPasswordsee(!confirmpasswordsee)
                  }
                >
                  {confirmpasswordsee ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </span>
              </div>
            </div>

            {/* Button */}
            <button
              className="btn w-100 fw-bold"
              type="submit"
              style={{
                backgroundColor: "#bfff00",
                color: "#000",
                height: "45px",
                borderRadius: "6px",
                border: "none",
                fontSize: "13px",
              }}
            >
              Update Password
            </button>

          </form>
        </div>

        {/* Bottom text */}
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

          .fitplan-eye {
            background-color: #111 !important;
            color: #666 !important;
            border: 1px solid #292929 !important;
            border-left: none !important;
          }

          .fitplan-eye:hover {
            color: #bfff00 !important;
          }
        `}
      </style>
    </div>
  );
}

export default UpdatePassword;