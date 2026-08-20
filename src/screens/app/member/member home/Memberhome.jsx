import React, { useEffect, useState } from "react";
import Logo from "../../../../assets/FitPlan_AI_Individual_Assets/logo.png";
import { supabase } from "../../../../utils/supabase";
import { Link,  useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

function Memberhome() {
  const [prompt, setPrompt] = useState(``);

  useEffect(() => {
    const getingPrompt = async () => {
      const {
        data: { user },
        error: getError,
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("Auth")
        .select("promptResult")
        .eq("id", user.id)
        .single();

      if (!error) {
        const parsedPrompt = JSON.parse(data.promptResult);

        setPrompt(parsedPrompt);
      }
    };
    getingPrompt();
  }, []);

  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/", { replace: true });
    }
  };

  const [logoutPopup,setLogoutPopup]=useState(false)

  return (
    <div style={{ backgroundColor: "black" }}>

      <header className="fit-header border-bottom" style={{ position: "fixed", zIndex: "999", backgroundColor: "black", left: "0", right: "0", top: "0", }} >

        <div className="container-fluid">

          <div className="d-flex justify-content-between align-items-center">

            <Link to={"/member-dashboard"}> <img src={Logo} alt="" width={170} className="my-2" /> </Link>
            <button onClick={()=>{setLogoutPopup(true)}} className="btn px-4 py-2 fw-semibold rounded-3" style={{ backgroundColor: "#bfff00", color: "#000", border: "none", }} > Logout </button>
          
          </div>
        </div>

  {logoutPopup && (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      backdropFilter: "blur(6px)",
      zIndex: "9999",
    }}
  >
    <div
      className="rounded-4 p-4 text-center"
      style={{
        width: "90%",
        maxWidth: "400px",
        backgroundColor: "#111827",
        border: "1px solid #bfff00",
        boxShadow: "0 0 30px rgba(191, 255, 0, 0.15)",
      }}
    >
      <h4
        className="fw-bold mb-2"
        style={{ color: "#bfff00" }}
      >
        Logout?
      </h4>

      <p className="text-secondary mb-4">
        Are you sure you want to logout from your account?
      </p>

      <div className="d-flex justify-content-center gap-3">

        <button
          onClick={() => setLogoutPopup(false)}
          className="btn px-4 py-2 fw-semibold rounded-3"
          style={{
            backgroundColor: "transparent",
            color: "#fff",
            border: "1px solid #6b7280",
          }}
        >
          Cancel
        </button>

        <button
          onClick={handleLogout}
          className="btn px-4 py-2 fw-semibold rounded-3"
          style={{
            backgroundColor: "#bfff00",
            color: "#000",
            border: "none",
          }}
        >
          Logout
        </button>

      </div>
    </div>
  </div>
)} 

      </header>

      {prompt && (
        <div
          className="container-fluid bg-black text-white min-vh-100 py-5"
          style={{ marginTop: "50px" }}
        >
          {/* HEADER */}
          <div className="container mb-5">
            <div className="text-center">
              <h1 className="fw-bold">
                Your <span style={{ color: "#bfff00" }}>Fitness Plan</span>
              </h1>

              <p className="text-secondary">
                Your personalized workout and nutrition plan
              </p>
            </div>
          </div>

  {/* ================= GROCERY ================= */}
          {prompt?.g?.length > 0 && (
            <div className="container mb-5">
              <h3 className="fw-bold mb-4">Grocery List</h3>

              <div className="row g-3">
                {prompt.g.map((item, index) => (
                  <div className="col-12 col-md-6 col-lg-4" key={index}>
                    <div className="card bg-dark text-white border-secondary">
                      <div className="card-body d-flex justify-content-between">
                        <div>
                          <h6 className="fw-bold mb-1">{item.i}</h6>

                          <small className="text-secondary">
                            {item.q} {item.u}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* ================= NUTRITION ================= */}
          {prompt?.t && (
            <div className="container mb-5">
              <h3 className="fw-bold mb-4">Daily Nutrition Targets</h3>

              <div className="row g-4">
                <div className="col-6 col-lg-3">
                  <div className="card bg-dark text-white border-secondary text-center h-100">
                    <div className="card-body">
                      <small className="text-secondary">BMR</small>

                      <h2 className="fw-bold mt-2">{prompt.t.b}</h2>

                      <small className="text-secondary">kcal</small>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-lg-3">
                  <div className="card bg-dark text-white border-secondary text-center h-100">
                    <div className="card-body">
                      <small className="text-secondary">TDEE</small>

                      <h2 className="fw-bold mt-2">{prompt.t.c}</h2>

                      <small className="text-secondary">kcal</small>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-lg-3">
                  <div className="card bg-dark text-white border-secondary text-center h-100">
                    <div className="card-body">
                      <small className="text-secondary">Target Calories</small>

                      <h2 className="fw-bold mt-2">{prompt.t.k}</h2>

                      <small className="text-secondary">kcal/day</small>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-lg-3">
                  <div className="card bg-dark text-white border-secondary text-center h-100">
                    <div className="card-body">
                      <small className="text-secondary">Protein</small>

                      <h2 className="fw-bold mt-2">{prompt.t.p}g</h2>

                      <small className="text-secondary">per day</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* MACROS */}
              <div className="row g-4 mt-1">
                <div className="col-12 col-md-4">
                  <div className="card bg-dark text-white border-secondary">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h6 className="fw-bold">Protein</h6>

                        <span style={{ color: "#bfff00" }}>{prompt.t.p}g</span>
                      </div>

                      <div className="progress mt-3" style={{ height: "8px" }}>
                        <div
                          className="progress-bar"
                          style={{
                            width: "100%",
                            backgroundColor: "#bfff00",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="card bg-dark text-white border-secondary">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h6 className="fw-bold">Carbohydrates</h6>

                        <span style={{ color: "#bfff00" }}>{prompt.t.ca}g</span>
                      </div>

                      <div className="progress mt-3" style={{ height: "8px" }}>
                        <div
                          className="progress-bar"
                          style={{
                            width: "100%",
                            backgroundColor: "#bfff00",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="card bg-dark text-white border-secondary">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h6 className="fw-bold">Fat</h6>

                        <span style={{ color: "#bfff00" }}>{prompt.t.f}g</span>
                      </div>

                      <div className="progress mt-3" style={{ height: "8px" }}>
                        <div
                          className="progress-bar"
                          style={{
                            width: "100%",
                            backgroundColor: "#bfff00",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= WORKOUT ================= */}
          {prompt?.w?.length > 0 && (
            <div className="container mb-5">
              <div className="mb-4">
                <h3 className="fw-bold mb-1">Workout Plan</h3>

                <p className="text-secondary mb-0">Your weekly workout plan</p>
              </div>

              <div className="row g-4">
                {prompt.w.map((day, index) => (
                  <div className="col-12 col-lg-6" key={index}>
                    <div className="card bg-dark text-white border-secondary h-100">
                      {/* DAY HEADER */}
                      <div className="card-header border-secondary">
                        <span
                          className="badge mb-2"
                          style={{
                            backgroundColor: "#bfff00",
                            color: "#000",
                          }}
                        >
                          {day.d}
                        </span>

                        <h4 className="fw-bold mb-1">{day.s}</h4>
                      </div>

                      {/* EXERCISES */}
                      <div className="card-body">
                        {day.e?.length > 0 ? (
                          day.e.map((exercise, exerciseIndex) => (
                            <div
                              key={exerciseIndex}
                              className="border-bottom border-secondary py-3"
                            >
                              <div className="d-flex justify-content-between gap-3">
                                <div>
                                  <h6 className="fw-bold mb-1">{exercise.n}</h6>
                                </div>

                                <div className="text-end flex-shrink-0">
                                  <span
                                    className="badge"
                                    style={{
                                      backgroundColor: "#bfff00",
                                      color: "#000",
                                    }}
                                  >
                                    {exercise.x} Sets
                                  </span>

                                  <div className="small mt-2">{exercise.r}</div>
                                </div>
                              </div>

                              <small className="text-secondary d-block mt-2">
                                Rest: {exercise.z}s
                              </small>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-4">
                            <span className="text-secondary">Recovery Day</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= MEAL PLAN ================= */}
          {prompt?.m?.length > 0 && (
            <div className="container pb-5">
              <h3 className="fw-bold mb-4">7-Day Meal Plan</h3>

              <div className="row g-4">
                {prompt.m.map((day, index) => (
                  <div className="col-12 col-lg-6" key={index}>
                    <div className="card bg-dark text-white border-secondary h-100">
                      {/* DAY HEADER */}
                      <div className="card-header border-secondary">
                        <h4 className="fw-bold mb-0">Day {day.d}</h4>
                      </div>

                      <div className="card-body">
                        {/* BREAKFAST */}
                        <div className="mb-4 pb-3 border-bottom border-secondary">
                          <h5 className="fw-bold" style={{ color: "#bfff00" }}>
                            Breakfast
                          </h5>

                          <h6 className="mt-2">{day.b}</h6>
                        </div>

                        {/* MORNING SNACK */}
                        <div className="mb-4 pb-3 border-bottom border-secondary">
                          <h5 className="fw-bold" style={{ color: "#bfff00" }}>
                            Morning Snack
                          </h5>

                          <h6 className="mt-2">{day.s}</h6>
                        </div>

                        {/* LUNCH */}
                        <div className="mb-4 pb-3 border-bottom border-secondary">
                          <h5 className="fw-bold" style={{ color: "#bfff00" }}>
                            Lunch
                          </h5>

                          <h6 className="mt-2">{day.l}</h6>
                        </div>

                        {/* EVENING SNACK */}
                        <div className="mb-4 pb-3 border-bottom border-secondary">
                          <h5 className="fw-bold" style={{ color: "#bfff00" }}>
                            Evening Snack
                          </h5>

                          <h6 className="mt-2">{day.e}</h6>
                        </div>

                        {/* DINNER */}
                        <div>
                          <h5 className="fw-bold" style={{ color: "#bfff00" }}>
                            Dinner
                          </h5>

                          <h6 className="mt-2">{day.n}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        

          {/* ================= PROGRESS ================= */}
          {prompt?.p && (
            <div className="container mb-5">
              <h3 className="fw-bold mb-4">Progress Tracking</h3>

              <div className="row g-4">
                <div className="col-12 col-md-6">
                  <div className="card bg-dark text-white border-secondary h-100">
                    <div className="card-body">
                      <h6 className="fw-bold">Weekly Weight</h6>

                      <p className="text-secondary mb-0">{prompt.p.w}</p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="card bg-dark text-white border-secondary h-100">
                    <div className="card-body">
                      <h6 className="fw-bold">Workout Adherence</h6>

                      <p className="text-secondary mb-0">{prompt.p.a}</p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="card bg-dark text-white border-secondary h-100">
                    <div className="card-body">
                      <h6 className="fw-bold">Nutrition Adherence</h6>

                      <p className="text-secondary mb-0">{prompt.p.n}</p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="card bg-dark text-white border-secondary h-100">
                    <div className="card-body">
                      <h6 className="fw-bold">Guidance</h6>

                      <p className="text-secondary mb-0">{prompt.p.g}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= SAFETY ================= */}
          {prompt?.safe && (
            <div className="container pb-5">
              <div
                className="p-4 rounded-3"
                style={{
                  backgroundColor: "#111",
                  border: "1px solid #bfff00",
                }}
              >
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span
                    style={{
                      color: "#bfff00",
                      fontSize: "20px",
                    }}
                  >
                    ⚠
                  </span>

                  <h5 className="fw-bold mb-0" style={{ color: "#bfff00" }}>
                    Safety Warning
                  </h5>
                </div>

                <p className="text-secondary mb-0">{prompt.safe}</p>
              </div>
            </div>
          )}
        </div>
      )}

      <footer className="bg-black text-white border-top border-secondary pt-5 pb-4">
        <div className="container">
          {/* TOP */}
          <div className="row align-items-center gy-4">
            {/* LOGO */}
            <div className="col-12 col-md-6 text-center text-md-start">
              <img
                src={Logo}
                alt="AS Fitness Club"
                width={180}
                className="mb-3"
              />

              <p className="text-secondary mb-0">
                Your personalized fitness and nutrition companion.
              </p>
            </div>

            {/* MESSAGE */}
            <div className="col-12 col-md-6 text-center text-md-end">
              <h5 className="fw-bold mb-2">
                Train <span style={{ color: "#bfff00" }}>Smart.</span>
              </h5>

              <p className="text-secondary mb-0">
                Eat better. Stay consistent. Keep moving.
              </p>
            </div>
          </div>

          {/* DIVIDER */}
          <hr className="border-secondary my-4" />

          {/* BOTTOM */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
            <small className="text-secondary">
              © 2026 AS Fitness planner. All rights reserved.
            </small>

            <small className="text-secondary">
              Made with <FaHeart color="red"/> by Md.Arsalan
            </small>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Memberhome;
