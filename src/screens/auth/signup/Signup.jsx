import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../utils/supabase";

import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {
  const navigate = useNavigate();

  const [passwordsee, setPasswordsee] = useState(false);
  const [confirmpasswordsee, setConfirmPasswordsee] = useState(false);

  const [signupData, setSignupData] = useState({
    role: "",
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
      Email:signupData.email,
      role: signupData.role,
    });

    Swal.fire({
      title: "Signup Successful!",
      text: "Your account has been created successfully.",
      icon: "success",
      confirmButtonText: "OK!",
      confirmButtonColor: "#0d6efd",
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "450px", width: "100%", borderRadius: "15px" }}
      >
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4 fw-bold">Signup</h2>

          <div className="mb-3">
            <label className="form-label">Select Your Role</label>
            <select
              name="role"
              className="form-select"
              value={signupData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Your Role</option>
              <option value="coach">Coach</option>
              <option value="member">Member</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={signupData.name}
              onChange={handleChange}
              placeholder="Enter Your FullName"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={signupData.email}
              onChange={handleChange}
              placeholder="Enter Your Email Address"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>

            <div className="input-group">
              <input
                type={passwordsee ? "text" : "password"}
                name="password"
                className="form-control"
                value={signupData.password}
                onChange={handleChange}
                placeholder="Enter Your Password"
                required
              />

              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setPasswordsee(!passwordsee)}
              >
                {passwordsee ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Confirm Password</label>

            <div className="input-group">
              <input
                type={confirmpasswordsee ? "text" : "password"}
                name="confirmpassword"
                className="form-control"
                value={signupData.confirmpassword}
                onChange={handleChange}
                placeholder="Re-Enter Your Password"
                required
              />

              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setConfirmPasswordsee(!confirmpasswordsee)
                }
              >
                {confirmpasswordsee ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Signup
          </button>

          <div className="text-center mt-4">
            <p className="mb-0">
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;