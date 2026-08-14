import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../utils/supabase";
import Logo from '../../../assets/FitPlan_AI_Individual_Assets/logo.png'
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

        {/* Logo / Brand */}
        <div className="text-center mb-4">
          <h3
            className="py-1"
         
          >
           <img src={Logo} alt="AS fitness" width={150} />
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

        {/* Login Card */}
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
                  color: "#fff",
                }}
              >
                Welcome <span style={{ color: "#bfff00" }}>Back.</span>
              </h2>

              <p
                className="mb-0"
                style={{
                  color: "#777",
                  fontSize: "13px",
                }}
              >
                Login to continue your fitness journey.
              </p>
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
                value={loginData.email}
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
                  value={loginData.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  required
                />

                <span
                  className="input-group-text fitplan-eye"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => setPasswordsee(!passwordsee)}
                >
                  {passwordsee ? <FaEyeSlash /> : <FaEye />}
                </span>

              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-end mb-4">
              <Link
                to="/forgetpassword"
                style={{
                  textDecoration: "none",
                  color: "#bfff00",
                  fontSize: "12px",
                }}
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
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
              Login
            </button>

            {/* Signup */}
            <div className="text-center mt-4">
              <p
                className="mb-0"
                style={{
                  color: "#777",
                  fontSize: "12px",
                }}
              >
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  style={{
                    color: "#bfff00",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Create Account
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
            fontSize: "10px",
          }}
        >
          Your data is secure and protected.
        </p>

      </div>
        <style>
        {`.fitplan-input {
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
}`}
      </style>
    </div>
  );
}

export default Login;