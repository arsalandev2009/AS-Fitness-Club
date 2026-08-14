import React from "react";
import Header from "../../../../component/landing page/header/Header";
import Footer from "../../../../component/landing page/footer/Footer";
import { Link } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import './Home.css'

function Home() {
  return (
     <div
  className="bg-black text-white overflow-hidden"
  style={{
    margin: 0,
    minHeight: "100vh",
  }}
>

      <Header />

      {/* ================= HERO ================= */}
  <section id="home" className="hero-section">
  <div className="container">

    <div className="row align-items-center min-vh-100">

      {/* LEFT CONTENT */}
      <div className="col-12 col-lg-6">

        <p className="hero-badge">
          ✨ AI-POWERED FITNESS COMPANION
        </p>

        <h1 className="hero-title">
          YOUR BODY.
          <br />
          YOUR PLAN.
          <br />
          <span>AI-POWERED.</span>
        </h1>

        <p className="hero-description">
          FitPlan AI creates a personalized diet + workout plan
          based on your goals, stats, budget and lifestyle.
          Real data. Real results.
        </p>

        <div className="hero-buttons">

          <Link
        to={'/signup'}
        className="btn hero-primary-btn"
          >
            Start Your Plan Now <FiSend/>
          </Link>

          <a
            href="#how-it-works"
            className="btn hero-secondary-btn"
          >
            See How It Works ▷
          </a>

        </div>

        {/* FEATURES */}
        <div className="row hero-features">

          <div className="col-12 col-sm-4">
            <div className="hero-feature">
              <span>◉</span>
              <p>
                AI Personalized
                <br />
                Plans
              </p>
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="hero-feature">
              <span>◉</span>
              <p>
                Budget Friendly
                <br />
                Meal Plans
              </p>
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="hero-feature">
              <span>◉</span>
              <p>
                Science Based
                <br />
                Workout Splits
              </p>
            </div>
          </div>

        </div>

      </div>


      {/* RIGHT SIDE */}
      <div className="col-12 col-lg-6">

        <div className="hero-right">

          <div className="hero-circle">

            <h2>AI</h2>

            <p>
              Your Personal
              <br />
              Fitness Companion
            </p>

          </div>

        </div>

      </div>

    </div>

  </div>
</section>

      {/* ================= STATS ================= */}
      <section className="container pb-5">
        <div
          className="border border-secondary rounded-3 p-4"
          style={{ backgroundColor: "#050505" }}
        >

          <div className="row text-center g-4">

            <div className="col-6 col-lg-3">
              <h2 style={{ color: "#bfff00" }} className="fw-bold">
                10K+
              </h2>
              <p className="text-secondary mb-0">
                Active Users
              </p>
            </div>

            <div className="col-6 col-lg-3">
              <h2 style={{ color: "#bfff00" }} className="fw-bold">
                98%
              </h2>
              <p className="text-secondary mb-0">
                Plan Success Rate
              </p>
            </div>

            <div className="col-6 col-lg-3">
              <h2 style={{ color: "#bfff00" }} className="fw-bold">
                50K+
              </h2>
              <p className="text-secondary mb-0">
                Plans Generated
              </p>
            </div>

            <div className="col-6 col-lg-3">
              <h2 style={{ color: "#bfff00" }} className="fw-bold">
                4.9/5
              </h2>
              <p className="text-secondary mb-0">
                User Rating
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="py-5">
        <div className="container py-5">

          <div className="text-center mb-5">

            <p
              className="fw-semibold mb-2"
              style={{ color: "#bfff00" }}
            >
              HOW IT WORKS
            </p>

            <h2 className="display-6 fw-bold">
              Simple Steps. Powerful Results.
            </h2>

          </div>

          <div className="row g-4 text-center">

            <div className="col-md-6 col-lg">
              <div className="p-3">
                <div
                  className="rounded-circle border mx-auto mb-4 d-flex align-items-center justify-content-center"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderColor: "#333 !important",
                    color: "#bfff00",
                    fontSize: "30px",
                  }}
                >
                  ①
                </div>

                <h5 className="fw-bold">
                  Tell Us About You
                </h5>

                <p className="text-secondary">
                  Share your stats, goals, preferences,
                  budget & lifestyle.
                </p>
              </div>
            </div>


            <div className="col-md-6 col-lg">
              <div className="p-3">

                <div
                  className="rounded-circle border mx-auto mb-4 d-flex align-items-center justify-content-center"
                  style={{
                    width: "80px",
                    height: "80px",
                    color: "#bfff00",
                    fontSize: "30px",
                  }}
                >
                  ②
                </div>

                <h5 className="fw-bold">
                  We Calculate Targets
                </h5>

                <p className="text-secondary">
                  We calculate your BMR, TDEE and macro
                  targets accurately.
                </p>

              </div>
            </div>


            <div className="col-md-6 col-lg">
              <div className="p-3">

                <div
                  className="rounded-circle border mx-auto mb-4 d-flex align-items-center justify-content-center"
                  style={{
                    width: "80px",
                    height: "80px",
                    color: "#bfff00",
                    fontSize: "30px",
                  }}
                >
                  ③
                </div>

                <h5 className="fw-bold">
                  AI Creates Your Plan
                </h5>

                <p className="text-secondary">
                  AI generates a personalized meal plan +
                  workout split within your budget.
                </p>

              </div>
            </div>


            <div className="col-md-6 col-lg">
              <div className="p-3">

                <div
                  className="rounded-circle border mx-auto mb-4 d-flex align-items-center justify-content-center"
                  style={{
                    width: "80px",
                    height: "80px",
                    color: "#bfff00",
                    fontSize: "30px",
                  }}
                >
                  ④
                </div>

                <h5 className="fw-bold">
                  Follow & Track
                </h5>

                <p className="text-secondary">
                  Follow the plan, log your workouts &
                  meals, track your progress.
                </p>

              </div>
            </div>


            <div className="col-md-6 col-lg">
              <div className="p-3">

                <div
                  className="rounded-circle border mx-auto mb-4 d-flex align-items-center justify-content-center"
                  style={{
                    width: "80px",
                    height: "80px",
                    color: "#bfff00",
                    fontSize: "30px",
                  }}
                >
                  ⑤
                </div>

                <h5 className="fw-bold">
                  Get Better Every Week
                </h5>

                <p className="text-secondary">
                  AI learns from your ratings & progress
                  to make next week even better.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ================= WHY FITPLAN ================= */}
      <section id="about" className="py-5 border-top border-secondary">

        <div className="container py-5">

          <div className="row align-items-center mb-5">

            <div className="col-lg-3 mb-4 mb-lg-0">

              <p
                className="fw-semibold"
                style={{ color: "#bfff00" }}
              >
                WHY FITPLAN AI?
              </p>

              <h2 className="fw-bold">
                More Than Just
                <br />
                A Plan.
              </h2>

            </div>


            <div className="col-lg-9">

              <div className="row g-3">

                <div className="col-md-6 col-lg-3">
                  <div className="border border-secondary rounded-3 p-4 h-100">
                    <h5
                      className="fw-bold"
                      style={{ color: "#bfff00" }}
                    >
                      AI-Powered
                      <br />
                      Personalization
                    </h5>

                    <p className="text-secondary small mb-0">
                      Plans built uniquely for your body,
                      goals and lifestyle.
                    </p>
                  </div>
                </div>


                <div className="col-md-6 col-lg-3">
                  <div className="border border-secondary rounded-3 p-4 h-100">

                    <h5
                      className="fw-bold"
                      style={{ color: "#bfff00" }}
                    >
                      Budget-Aware
                      <br />
                      Meal Plans
                    </h5>

                    <p className="text-secondary small mb-0">
                      Real ingredient prices and realistic
                      grocery lists within your budget.
                    </p>

                  </div>
                </div>


                <div className="col-md-6 col-lg-3">
                  <div className="border border-secondary rounded-3 p-4 h-100">

                    <h5
                      className="fw-bold"
                      style={{ color: "#bfff00" }}
                    >
                      Smart Workout
                      <br />
                      Splits
                    </h5>

                    <p className="text-secondary small mb-0">
                      Personalized workout splits based on
                      your experience and equipment.
                    </p>

                  </div>
                </div>


                <div className="col-md-6 col-lg-3">
                  <div className="border border-secondary rounded-3 p-4 h-100">

                    <h5
                      className="fw-bold"
                      style={{ color: "#bfff00" }}
                    >
                      Secure & Private
                    </h5>

                    <p className="text-secondary small mb-0">
                      Your data is protected with secure
                      enterprise-grade security.
                    </p>

                  </div>
                </div>

              </div>

            </div>

          </div>


          {/* ================= EVERYTHING YOU NEED ================= */}

          <div className="row align-items-center">

            <div className="col-lg-3 mb-4">

              <p
                className="fw-semibold"
                style={{ color: "#bfff00" }}
              >
                WHAT YOU GET
              </p>

              <h2 className="fw-bold">
                Everything You Need
                <br />
                To Transform.
              </h2>

            </div>


            <div className="col-lg-9">

              <div className="row g-4 text-center">

                <div className="col-6 col-lg">
                  <h3 style={{ color: "#bfff00" }}>
                    ◈
                  </h3>

                  <h6 className="fw-bold">
                    7-Day Meal Plan
                  </h6>

                  <p className="small text-secondary">
                    With recipes, calories & macros.
                  </p>
                </div>


                <div className="col-6 col-lg">
                  <h3 style={{ color: "#bfff00" }}>
                    ◈
                  </h3>

                  <h6 className="fw-bold">
                    Weekly Workout Plan
                  </h6>

                  <p className="small text-secondary">
                    Customized split with exercises,
                    sets & reps.
                  </p>
                </div>


                <div className="col-6 col-lg">
                  <h3 style={{ color: "#bfff00" }}>
                    ◈
                  </h3>

                  <h6 className="fw-bold">
                    Grocery List
                  </h6>

                  <p className="small text-secondary">
                    Auto-generated list with total cost.
                  </p>
                </div>


                <div className="col-6 col-lg">
                  <h3 style={{ color: "#bfff00" }}>
                    ◈
                  </h3>

                  <h6 className="fw-bold">
                    Progress Tracking
                  </h6>

                  <p className="small text-secondary">
                    Weight, workouts, calories & more.
                  </p>
                </div>


                <div className="col-6 col-lg">
                  <h3 style={{ color: "#bfff00" }}>
                    AI
                  </h3>

                  <h6 className="fw-bold">
                    AI Adaptation
                  </h6>

                  <p className="small text-secondary">
                    Plans improve based on your feedback.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section id="contact" className="py-5">

        <div className="container">

          <div
            className="rounded-3 border p-4 p-lg-5"
            style={{
              borderColor: "#526600",
              background:
                "linear-gradient(90deg, #111600, #050505)",
            }}
          >

            <div className="row align-items-center">

              <div className="col-lg-8">

                <h2 className="fw-bold">
                  READY TO TAKE{" "}
                  <span style={{ color: "#bfff00" }}>
                    CONTROL?
                  </span>
                </h2>

                <p className="text-secondary fs-5 mb-0">
                  Join thousands who are building a better
                  version of themselves with AI-powered plans
                  that actually work.
                </p>

              </div>


              <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">

                <Link
                  to="/signup"
                  className="btn fw-bold px-4 py-3"
                  style={{
                    backgroundColor: "#bfff00",
                    color: "#000",
                  }}
                >
                  Start Your Plan Now <FiSend/>
                </Link>

                <p className="small text-secondary mt-2 mb-0">
                  No credit card required
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= TRUST POINTS ================= */}
      <section className="container py-5">

        <div className="row text-center g-4">

          <div className="col-6 col-lg-3">
            <h4 style={{ color: "#bfff00" }}>
              ⚗
            </h4>
            <p className="mb-0">
              Science Based
              <br />
              BMR/TDEE Calculations
            </p>
          </div>

          <div className="col-6 col-lg-3">
            <h4 style={{ color: "#bfff00" }}>
              ◉
            </h4>
            <p className="mb-0">
              Real Data
              <br />
              Real Results
            </p>
          </div>

          <div className="col-6 col-lg-3">
            <h4 style={{ color: "#bfff00" }}>
              ◎
            </h4>
            <p className="mb-0">
              Trusted by
              <br />
              10,000+ Users
            </p>
          </div>

          <div className="col-6 col-lg-3">
            <h4 style={{ color: "#bfff00" }}>
              ◎
            </h4>
            <p className="mb-0">
              Made for Your
              <br />
              Goals & Lifestyle
            </p>
          </div>

        </div>

      </section>


      <Footer />

    </div>
  );
}

export default Home;