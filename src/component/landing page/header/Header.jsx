import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/FitPlan_AI_Individual_Assets/logo.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen((prev) => !prev);

    // Agar menu open ho raha hai to 2 sec baad close
    if (!menuOpen) {
      setTimeout(() => {
        setMenuOpen(false);
      }, 5000);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header
      style={{
        backgroundColor: "#000",
        borderBottom: "1px solid #333",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
      }}
    >
      <nav
        style={{
          height: "70px",
          padding: "0 5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {/* Logo */}
        <Link to="/" onClick={closeMenu}>
          <img
            src={Logo}
            alt="FitPlan AI"
            style={{
              width: "150px",
              display: "block",
            }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div
          className="desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <a
            href="#home"
            style={{
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Home
          </a>

          <a
            href="#features"
            style={{
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Learn More
          </a>

          <Link
            to="/signup"
            style={{
              backgroundColor: "#bfff00",
              color: "#000",
              textDecoration: "none",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "6px",
            }}
          >
            Get Started Free
          </Link>
        </div>

        {/* Hamburger Button */}
        <button
          className="hamburger"
          onClick={handleMenu}
          style={{
            display: "none",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "8px",
          }}
        >
          <span
            style={{
              display: "block",
              width: "28px",
              height: "3px",
              backgroundColor: "#fff",
              margin: "5px 0",
              borderRadius: "5px",
            }}
          ></span>

          <span
            style={{
              display: "block",
              width: "28px",
              height: "3px",
              backgroundColor: "#fff",
              margin: "5px 0",
              borderRadius: "5px",
            }}
          ></span>

          <span
            style={{
              display: "block",
              width: "28px",
              height: "3px",
              backgroundColor: "#fff",
              margin: "5px 0",
              borderRadius: "5px",
            }}
          ></span>
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="mobile-menu"
            style={{
              position: "absolute",
              top: "65px",
              right: "15px",
              width: "220px",
              backgroundColor: "#000",
              border: "1px solid #555",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <a
                href="#home"
                onClick={closeMenu}
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  padding: "10px",
                  borderRadius: "6px",
                }}
              >
                Home
              </a>

              <a
                href="#how-it-works"
                onClick={closeMenu}
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  padding: "10px",
                  borderRadius: "6px",
                }}
              >
                How It Works
              </a>

              <Link
                to="/signup"
                onClick={closeMenu}
                style={{
                  backgroundColor: "#bfff00",
                  color: "#000",
                  textDecoration: "none",
                  fontWeight: "bold",
                  padding: "10px",
                  borderRadius: "6px",
                  textAlign: "center",
                  marginTop: "5px",
                }}
              >
                Get Started Free
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Responsive CSS */}
      <style>
        {`
          @media (max-width: 991px) {
            .desktop-nav {
              display: none !important;
            }

            .hamburger {
              display: block !important;
            }
          }

          @media (min-width: 992px) {
            .mobile-menu {
              display: none !important;
            }
          }

          @media (max-width: 480px) {
            nav {
              padding-left: 15px !important;
              padding-right: 15px !important;
            }

            nav img {
              width: 125px !important;
            }
          }
        `}
      </style>
    </header>
  );
}

export default Header;
