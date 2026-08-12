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
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "450px", width: "100%", borderRadius: "15px" }}
      >
        <h2 className="text-center mb-4">Update Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Enter New Password</label>

            <div className="input-group">
              <input
                type={passwordsee ? "text" : "password"}
                name="password"
                className="form-control"
                value={update.password}
                onChange={handleChange}
                placeholder="Enter New Password"
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
            <label className="form-label">Confirm New Password</label>

            <div className="input-group">
              <input
                type={confirmpasswordsee ? "text" : "password"}
                name="confirmpassword"
                className="form-control"
                value={update.confirmpassword}
                onChange={handleChange}
                placeholder=" Confirm New Password"
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

          <button className="btn btn-primary w-100" type="submit">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;