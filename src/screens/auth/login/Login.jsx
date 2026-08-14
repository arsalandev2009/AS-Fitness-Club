import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../utils/supabase";

import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [adminauth, setAdminauth] = useState("");

  const [passwordsee, setPasswordsee] = useState(false);

  useEffect(() => {
    const getadmindata = async () => {
      const { data: admindata, error: adminerror } = await supabase
        .from("admin-auth")
        .select("email,password")
        .single();
      if (adminerror) {
        console.log(adminerror);
        return;
      }
      setAdminauth(admindata);
    };
    getadmindata();
  }, []);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      adminauth &&
      loginData.email.trim() === adminauth.email.trim() &&
      loginData.password.trim() === adminauth.password.trim()
    ) {
      Swal.fire({
        icon: "success",
        title: "Login Successfully!",
        text: "Redirecting to dashboard...",
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        navigate("/admin-dashboard");
      });
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });

    if (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
      return;
    } else {
      const { data: getData, error: getError } = await supabase
        .from("Auth")
        .select("role")
        .eq("id", data.user.id)
        .maybeSingle();

      if (getError) {
        alert(getError.message);
        return;
      } else if (getData.role === "member") {
        Swal.fire({
          icon: "success",
          title: "Login Successfully!",
          text: "Redirecting to dashboard...",
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          navigate("/member-dashboard");
        });
        return;
      } else if (getData.role === "coach") {
        Swal.fire({
          icon: "success",
          title: "Login Successfully!",
          text: "Redirecting to dashboard...",
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          navigate("/coach-dashboard");
        });
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "420px", width: "100%", borderRadius: "15px" }}
      >
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4 fw-bold">Login</h2>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter Your email"
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
                value={loginData.password}
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

          <div className="text-center mb-3">
            <Link
              to="/forgetpassword"
              className="text-decoration-none small mb-4"
            >
              Forgot Password?
            </Link>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>

          <div className="text-center mt-3">
            <p className="mb-2">
              Don't have an account?{" "}
              <Link to="/signup" className="text-decoration-none">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
