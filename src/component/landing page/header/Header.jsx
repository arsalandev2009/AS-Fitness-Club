import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/FitPlan_AI_Individual_Assets/logo.png";

function Header() {
  return (
    <header className="bg-black border-bottom py-1 border-dark position-fixed" style={{right:'0',left:'0',zIndex:'999'}}>
      
      <nav className="navbar navbar-dark px-3 px-lg-5 py-2">

        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <img
            src={Logo}
            alt="FitPlan AI"
            style={{ width: "150px" }}
          />
        </Link>

        {/* Hamburger */}
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#fitPlanNavbar"
          aria-controls="fitPlanNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Desktop Navigation */}
        <div className="d-none d-lg-flex align-items-center gap-4">

          <a
            href="#home"
            className="text-white text-decoration-none"
          >
            Home
          </a>

          <a
            href="#features"
            className="text-white text-decoration-none"
          >
           Learn More
          </a>

        

          <Link
            to="/signup"
            className="btn fw-bold px-4"
            style={{
              backgroundColor: "#bfff00",
              color: "#000",
            }}
          >
            Get Started Free
          </Link>

        </div>

        {/* Mobile Menu */}
        <div
          className="collapse position-absolute d-lg-none"
          id="fitPlanNavbar"
          style={{
            top: "100%",
            right: "15px",
            width: "220px",
            zIndex: 1000,
          }}
        >
          <div
            className="bg-black border border-secondary rounded-3 p-3 shadow-lg"
          >

            <div className="d-flex flex-column gap-2">

              <a
                href="#home"
                className="text-white text-decoration-none p-2 rounded"
              >
                Home
              </a>

              <a
                href="#how-it-works"
                className="text-white text-decoration-none p-2 rounded"
              >
                How It Works
              </a>

              <a
                href="#contact"
                className="text-white text-decoration-none p-2 rounded"
              >
                Contact Us
              </a>

              <a
                href="#about"
                className="text-white text-decoration-none p-2 rounded"
              >
                About Us
              </a>

              <Link
                to="/signup"
                className="btn fw-bold mt-2"
                style={{
                  backgroundColor: "#bfff00",
                  color: "#000",
                }}
              >
                Get Started Free
              </Link>

            </div>

          </div>
        </div>

      </nav>
    </header>
  );
}

export default Header;