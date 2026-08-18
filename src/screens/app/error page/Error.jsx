import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {

  const navigate = useNavigate();

  return (
    <div
      className="bg-black text-white min-vh-100 d-flex align-items-center justify-content-center"
    >

      <div className="container text-center">

        {/* 404 */}
        <h1
          className="fw-bold"
          style={{
            fontSize: "clamp(100px, 20vw, 220px)",
            lineHeight: "1",
            color: "#bfff00"
          }}
        >
          404
        </h1>

        {/* MESSAGE */}
        <h2 className="fw-bold mt-3">
          Looks like you lost your{" "}
          <span style={{ color: "#bfff00" }}>
            way.
          </span>
        </h2>

        <p className="text-secondary mt-3 mb-4">
          This page doesn't exist. Let's get you back on track.
        </p>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="btn fw-bold px-4 py-3"
          style={{
            backgroundColor: "#bfff00",
            color: "#000",
            border: "none"
          }}
        >
          Back to Home
        </button>

      </div>

    </div>
  );
}

export default NotFound;