import React, { useState } from "react";
import { supabase } from "../../../utils/supabase";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

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
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "420px", width: "100%", borderRadius: "15px" }}
      >
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4 fw-bold">Forgot Password</h2>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 mt-4">
            Did You Remember the password ? <Link to="/login">Click here</Link>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
