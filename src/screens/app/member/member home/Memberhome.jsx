import React, { useEffect, useState } from "react";
import Logo from "../../../../assets/FitPlan_AI_Individual_Assets/logo.png";
import { supabase } from "../../../../utils/supabase";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
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

  return (
    <div style={{ backgroundColor: "black" }}>
    <header className="fit-header border-bottom">
  <div className="container-fluid">
    <div className="d-flex justify-content-between align-items-center">

      <img
        src={Logo}
        alt=""
        width={220}
        className="my-2"
      />

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
</header>

{prompt && (
 <div className="container-fluid bg-black text-white min-vh-100 py-5">

  {/* PAGE TITLE */}
  <div className="container mb-5">
    <div className="text-center">
      <h1 className="fw-bold">Your Fitness Plan</h1>
      <p className="text-secondary">
        Your personalized workout and nutrition plan
      </p>
    </div>
  </div>


  {/* PROFILE SUMMARY */}
  <div className="container mb-5">

    <h3 className="fw-bold mb-4">Profile Summary</h3>

    <div className="row g-4">

      <div className="col-12 col-md-6 col-lg-4">
        <div className="card bg-dark text-white border-secondary h-100">
          <div className="card-body">
            <small className="text-secondary">Goal</small>
            <h4 className="fw-bold mt-2">
              {prompt.profileSummary.goal}
            </h4>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-4">
        <div className="card bg-dark text-white border-secondary h-100">
          <div className="card-body">
            <small className="text-secondary">Experience Level</small>
            <h4 className="fw-bold mt-2">
              {prompt.profileSummary.experienceLevel}
            </h4>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-4">
        <div className="card bg-dark text-white border-secondary h-100">
          <div className="card-body">
            <small className="text-secondary">Equipment</small>
            <h4 className="fw-bold mt-2">
              {prompt.profileSummary.equipment}
            </h4>
          </div>
        </div>
      </div>

      <div className="col-12">
        <div className="card bg-dark text-white border-secondary">
          <div className="card-body">
            <small className="text-secondary">Strategy</small>
            <p className="mb-0 mt-2">
              {prompt.profileSummary.strategy}
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>


  {/* NUTRITION TARGETS */}
  <div className="container mb-5">

    <h3 className="fw-bold mb-4">Daily Nutrition Targets</h3>

    <div className="row g-4">

      <div className="col-6 col-lg-3">
        <div className="card bg-dark text-white border-secondary text-center">
          <div className="card-body">
            <small className="text-secondary">BMR</small>
            <h2 className="fw-bold mt-2">
              {prompt.nutritionTargets.bmr}
            </h2>
            <small>kcal</small>
          </div>
        </div>
      </div>

      <div className="col-6 col-lg-3">
        <div className="card bg-dark text-white border-secondary text-center">
          <div className="card-body">
            <small className="text-secondary">TDEE</small>
            <h2 className="fw-bold mt-2">
              {prompt.nutritionTargets.tdee}
            </h2>
            <small>kcal</small>
          </div>
        </div>
      </div>

      <div className="col-6 col-lg-3">
        <div className="card bg-dark text-white border-secondary text-center">
          <div className="card-body">
            <small className="text-secondary">Calories</small>
            <h2 className="fw-bold mt-2">
              {prompt.nutritionTargets.targetCalories}
            </h2>
            <small>kcal/day</small>
          </div>
        </div>
      </div>

      <div className="col-6 col-lg-3">
        <div className="card bg-dark text-white border-secondary text-center">
          <div className="card-body">
            <small className="text-secondary">Protein</small>
            <h2 className="fw-bold mt-2">
              {prompt.nutritionTargets.proteinGrams}g
            </h2>
            <small>per day</small>
          </div>
        </div>
      </div>

    </div>

    {/* MACROS */}
    <div className="row g-4 mt-1">

      <div className="col-12 col-md-4">
        <div className="card bg-dark text-white border-secondary">
          <div className="card-body">
            <h5>Protein</h5>
            <div className="progress mt-3" style={{ height: "10px" }}>
              <div
                className="progress-bar"
                style={{ width: "36%", backgroundColor: "#bfff00" }}
              ></div>
            </div>
            <p className="mt-2 mb-0">
              {prompt.nutritionTargets.proteinGrams}g
            </p>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-4">
        <div className="card bg-dark text-white border-secondary">
          <div className="card-body">
            <h5>Carbohydrates</h5>
            <div className="progress mt-3" style={{ height: "10px" }}>
              <div
                className="progress-bar"
                style={{ width: "70%", backgroundColor: "#bfff00" }}
              ></div>
            </div>
            <p className="mt-2 mb-0">
              {prompt.nutritionTargets.carbsGrams}g
            </p>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-4">
        <div className="card bg-dark text-white border-secondary">
          <div className="card-body">
            <h5>Fat</h5>
            <div className="progress mt-3" style={{ height: "10px" }}>
              <div
                className="progress-bar"
                style={{ width: "45%", backgroundColor: "#bfff00" }}
              ></div>
            </div>
            <p className="mt-2 mb-0">
              {prompt.nutritionTargets.fatGrams}g
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>


  {/* WORKOUT PLAN */}
  <div className="container mb-5">

    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h3 className="fw-bold mb-1">Workout Plan</h3>
        <p className="text-secondary mb-0">
          {prompt.profileSummary.trainingDays} days per week
        </p>
      </div>
    </div>

    <div className="row g-4">

      {prompt.workoutPlan?.map((day, index) => (

        <div className="col-12 col-lg-6" key={index}>

          <div className="card bg-dark text-white border-secondary h-100">

            <div className="card-header border-secondary">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="badge bg-secondary mb-2">
                    {day.day}
                  </span>

                  <h4 className="fw-bold mb-1">
                    {day.split}
                  </h4>

                  <small className="text-secondary">
                    {day.focus}
                  </small>
                </div>
              </div>
            </div>

            <div className="card-body">

              {day.exercises?.map((exercise, exerciseIndex) => (

                <div
                  key={exerciseIndex}
                  className="border-bottom border-secondary py-3"
                >

                  <div className="d-flex justify-content-between gap-3">

                    <div>
                      <h6 className="fw-bold mb-1">
                        {exercise.name}
                      </h6>

                      <small className="text-secondary">
                        {exercise.notes}
                      </small>
                    </div>

                    <div className="text-end flex-shrink-0">
                      <span className="badge bg-light text-dark">
                        {exercise.sets} Sets
                      </span>

                      <div className="small mt-2">
                        {exercise.reps}
                      </div>
                    </div>

                  </div>

                  <small className="text-secondary d-block mt-2">
                    Rest: {exercise.restSeconds}s
                  </small>

                </div>

              ))}

            </div>
          </div>

        </div>

      ))}

    </div>
  </div>


  {/* MEAL PLAN */}
  <div className="container pb-5">

    <h3 className="fw-bold mb-4">Meal Plan</h3>

    <div className="row g-4">

      {prompt.mealPlan?.map((day, index) => (

        <div className="col-12 col-lg-6" key={index}>

          <div className="card bg-dark text-white border-secondary h-100">

            <div className="card-header border-secondary">
              <h4 className="fw-bold mb-0">
                {day.day}
              </h4>
            </div>

            <div className="card-body">

              {/* BREAKFAST */}
              <div className="mb-4">
                <h5 className="fw-bold">
                  Breakfast
                </h5>

                <h6 className="text-white">
                  {day.meals.breakfast.mealName}
                </h6>

                <ul className="text-secondary">
                  {day.meals.breakfast.foods.map((food, i) => (
                    <li key={i}>{food}</li>
                  ))}
                </ul>

                <div className="small">
                  Calories: {day.meals.breakfast.estimatedCalories} |
                  Protein: {day.meals.breakfast.protein}g |
                  Carbs: {day.meals.breakfast.carbs}g |
                  Fat: {day.meals.breakfast.fat}g
                </div>
              </div>


              {/* MORNING SNACK */}
              <div className="mb-4">
                <h5 className="fw-bold">
                  Morning Snack
                </h5>

                <h6>
                  {day.meals.morningSnack.mealName}
                </h6>

                <ul className="text-secondary">
                  {day.meals.morningSnack.foods.map((food, i) => (
                    <li key={i}>{food}</li>
                  ))}
                </ul>

                <div className="small">
                  Calories: {day.meals.morningSnack.estimatedCalories} |
                  Protein: {day.meals.morningSnack.protein}g |
                  Carbs: {day.meals.morningSnack.carbs}g |
                  Fat: {day.meals.morningSnack.fat}g
                </div>
              </div>


              {/* LUNCH */}
              <div className="mb-4">
                <h5 className="fw-bold">
                  Lunch
                </h5>

                <h6>
                  {day.meals.lunch.mealName}
                </h6>

                <ul className="text-secondary">
                  {day.meals.lunch.foods.map((food, i) => (
                    <li key={i}>{food}</li>
                  ))}
                </ul>

                <div className="small">
                  Calories: {day.meals.lunch.estimatedCalories} |
                  Protein: {day.meals.lunch.protein}g |
                  Carbs: {day.meals.lunch.carbs}g |
                  Fat: {day.meals.lunch.fat}g
                </div>
              </div>


              {/* EVENING SNACK */}
              <div className="mb-4">
                <h5 className="fw-bold">
                  Evening Snack
                </h5>

                <h6>
                  {day.meals.eveningSnack.mealName}
                </h6>

                <ul className="text-secondary">
                  {day.meals.eveningSnack.foods.map((food, i) => (
                    <li key={i}>{food}</li>
                  ))}
                </ul>

                <div className="small">
                  Calories: {day.meals.eveningSnack.estimatedCalories} |
                  Protein: {day.meals.eveningSnack.protein}g |
                  Carbs: {day.meals.eveningSnack.carbs}g |
                  Fat: {day.meals.eveningSnack.fat}g
                </div>
              </div>


              {/* DINNER */}
              <div>
                <h5 className="fw-bold">
                  Dinner
                </h5>

                <h6>
                  {day.meals.dinner.mealName}
                </h6>

                <ul className="text-secondary">
                  {day.meals.dinner.foods.map((food, i) => (
                    <li key={i}>{food}</li>
                  ))}
                </ul>

                <div className="small">
                  Calories: {day.meals.dinner.estimatedCalories} |
                  Protein: {day.meals.dinner.protein}g |
                  Carbs: {day.meals.dinner.carbs}g |
                  Fat: {day.meals.dinner.fat}g
                </div>
              </div>

            </div>

          </div>

        </div>

      ))}

    </div>

  </div>

</div>
)}

    </div>
  );
}

export default Memberhome;