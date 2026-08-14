import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/FitPlan_AI_Individual_Assets/logo.png";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiSend } from "react-icons/fi";


function Footer() {
  return (
    <footer
      className="bg-black text-white border-top border-secondary"
      style={{ overflowX: "hidden" }}
    >
      <div className="container py-5">

        <div className="row g-4">

          {/* ================= BRAND ================= */}
          <div className="col-12 col-md-6 col-lg-4">

            <Link to="/" className="d-inline-block mb-3">
              <img
                src={Logo}
                alt="FitPlan AI"
                style={{
                  width: "145px",
                  maxWidth: "100%",
                }}
              />
            </Link>

            <p className="text-secondary mb-4">
              Your body. Your plan. AI-powered.
            </p>

            {/* Social Icons */}
            <div className="d-flex gap-2">

              <a
                href="#instagram"
                className="footer-social"
              >
                <FaInstagram/>
              </a>

              <a
                href="#facebook"
                className="footer-social"
              >
                <FaFacebook/>
              </a>

              <a
                href="#youtube"
                className="footer-social"
              >
                <FaYoutube/>
              </a>

              <a
                href="#twitter"
                className="footer-social"
              >
                <FaTwitter/>
              </a>

            </div>

          </div>


          {/* ================= PRODUCT ================= */}
          <div className="col-6 col-md-3 col-lg-2">

            <h6 className="footer-heading">
              Product
            </h6>

            <ul className="list-unstyled">

              <li className="mb-2">
                <a href="#features" className="footer-link">
                  Features
                </a>
              </li>

              <li className="mb-2">
                <a href="#plans" className="footer-link">
                  Plans
                </a>
              </li>

              <li className="mb-2">
                <a href="#how-it-works" className="footer-link">
                  How It Works
                </a>
              </li>

              <li>
                <Link to="/dashboard" className="footer-link">
                  Dashboard
                </Link>
              </li>

            </ul>

          </div>


          {/* ================= COMPANY ================= */}
          <div className="col-6 col-md-3 col-lg-2">

            <h6 className="footer-heading">
              Company
            </h6>

            <ul className="list-unstyled">

              <li className="mb-2">
                <a href="#about" className="footer-link">
                  About Us
                </a>
              </li>

              <li className="mb-2">
                <a href="#blog" className="footer-link">
                  Blog
                </a>
              </li>

              <li className="mb-2">
                <a href="#careers" className="footer-link">
                  Careers
                </a>
              </li>

              <li>
                <a href="#contact" className="footer-link">
                  Contact
                </a>
              </li>

            </ul>

          </div>


          {/* ================= SUPPORT ================= */}
          <div className="col-6 col-md-3 col-lg-2">

            <h6 className="footer-heading">
              Support
            </h6>

            <ul className="list-unstyled">

              <li className="mb-2">
                <a href="#help" className="footer-link">
                  Help Center
                </a>
              </li>

              <li className="mb-2">
                <a href="#privacy" className="footer-link">
                  Privacy Policy
                </a>
              </li>

              <li className="mb-2">
                <a href="#terms" className="footer-link">
                  Terms of Service
                </a>
              </li>

              <li>
                <a href="#refund" className="footer-link">
                  Refund Policy
                </a>
              </li>

            </ul>

          </div>


          {/* ================= NEWSLETTER ================= */}
          <div className="col-12 col-md-6 col-lg-2">

            <h6 className="footer-heading">
              Newsletter
            </h6>

            <p className="text-secondary small">
              Get tips, updates & exclusive offers.
            </p>

            <div className="input-group">

              <input
                type="email"
                className="form-control bg-dark text-white border-secondary"
                placeholder="Enter your email"
              />

              <button
                className="btn fw-bold"
                style={{
                  backgroundColor: "#bfff00",
                  color: "#000",
                }}
              >
               
                <FiSend />
             
              </button>

            </div>

          </div>

        </div>


        {/* ================= BOTTOM ================= */}
        <div className="border-top border-secondary mt-5 pt-4">

          <div className="text-center">

            <p className="text-secondary small mb-0">
              © 2026 FitPlan AI. All rights reserved.
            </p>

          </div>

        </div>

      </div>


      {/* ================= FOOTER CSS ================= */}
      <style>
        {`
          .footer-heading {
            color: #bfff00;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 18px;
          }

          .footer-link {
            color: #999;
            text-decoration: none;
            font-size: 13px;
            transition: 0.2s;
          }

          .footer-link:hover {
            color: #bfff00;
          }

          .footer-social {
            width: 32px;
            height: 32px;
            border: 1px solid #333;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #aaa;
            text-decoration: none;
            font-size: 13px;
            transition: 0.2s;
          }

          .footer-social:hover {
            color: #bfff00;
            border-color: #bfff00;
          }

          .form-control::placeholder {
            color: #666;
          }

          .form-control:focus {
            background-color: #111;
            color: white;
            border-color: #bfff00;
            box-shadow: none;
          }

          @media (max-width: 575px) {
            .footer-heading {
              margin-bottom: 12px;
            }

            .footer-link {
              font-size: 12px;
            }
          }
        `}
      </style>

    </footer>
  );
}

export default Footer;