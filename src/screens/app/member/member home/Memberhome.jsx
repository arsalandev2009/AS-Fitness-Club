import React, { useEffect, useState } from "react";
import { groq } from "../../../../utils/groqAPI";
import {
  FaDumbbell,
  FaRobot,
  FaUtensils,
  FaShoppingBasket,
  FaWallet,
  FaFire,
  FaCheckCircle,
} from "react-icons/fa";
import { useSelector } from "react-redux";

function Memberhome() {
  const memberData = useSelector((state) => state.member);

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generatePlan = async () => {
      try {
        setLoading(true);

        const result = await groq.chat.completions.create({
          model: "openai/gpt-oss-120b",

          messages: [
            {
              role: "system",
              content: `
You are FitPlan AI, a professional fitness and nutrition planner for AS Fitness Club.

Create a personalized fitness plan using ONLY the member information provided below.

Member Information:

Age: ${memberData.age}
Gender: ${memberData.gender}
Height: ${memberData.height} cm
Weight: ${memberData.weight} kg

Goal: ${memberData.goal}
Activity Level: ${memberData.activity}
Training Experience: ${memberData.trainingExperience}
Days Available Per Week: ${memberData.daysPerWeek}

Available Equipment: ${memberData.equipment}

Diet Preference: ${memberData.diet}
Allergies: ${memberData.allergies}
Preferred Cuisine: ${memberData.cuisine}
Weekly Budget: PKR ${memberData.budget}

Create:

1. A personalized 7-day meal plan.
2. A weekly workout plan.
3. A grocery list.
4. Estimated weekly grocery cost.

IMPORTANT:

- Respect the member's allergies.
- Respect the member's diet preference.
- Respect the preferred cuisine.
- Keep the food practical and affordable.
- Keep the grocery cost close to the weekly budget.
- Respect the fitness goal.
- Respect available equipment.
- Respect training experience.
- Respect available training days.
- Do NOT ask questions.
- Do NOT add unnecessary explanations.
- Return ONLY valid JSON.
- Do not use markdown.
- Do not wrap JSON inside \`\`\`.

Return exactly this JSON structure:

{
  "summary": {
    "goal": "string",
    "dailyCalories": "string",
    "weeklyBudget": "string"
  },

  "mealPlan": [
    {
      "day": "Monday",
      "breakfast": "string",
      "lunch": "string",
      "snack": "string",
      "dinner": "string"
    },
    {
      "day": "Tuesday",
      "breakfast": "string",
      "lunch": "string",
      "snack": "string",
      "dinner": "string"
    },
    {
      "day": "Wednesday",
      "breakfast": "string",
      "lunch": "string",
      "snack": "string",
      "dinner": "string"
    },
    {
      "day": "Thursday",
      "breakfast": "string",
      "lunch": "string",
      "snack": "string",
      "dinner": "string"
    },
    {
      "day": "Friday",
      "breakfast": "string",
      "lunch": "string",
      "snack": "string",
      "dinner": "string"
    },
    {
      "day": "Saturday",
      "breakfast": "string",
      "lunch": "string",
      "snack": "string",
      "dinner": "string"
    },
    {
      "day": "Sunday",
      "breakfast": "string",
      "lunch": "string",
      "snack": "string",
      "dinner": "string"
    }
  ],

  "workoutPlan": [
    {
      "day": "Monday",
      "focus": "string",
      "exercises": [
        "Exercise - sets x reps"
      ]
    }
  ],

  "groceryList": [
    {
      "item": "string",
      "quantity": "string",
      "estimatedCost": "string"
    }
  ],

  "estimatedWeeklyCost": "string"
}
`,
            },
          ],
        });

        let aiResponse = result.choices[0].message.content;

        // Remove markdown if AI accidentally adds it
        aiResponse = aiResponse
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        const parsedPlan = JSON.parse(aiResponse);

        setPlan(parsedPlan);
      } catch (error) {
        console.log("Plan generation error:", error);

        setPlan(null);
      } finally {
        setLoading(false);
      }
    };

    generatePlan();
  }, [memberData]);

  return (
    <div
      className="container-fluid min-vh-100 py-3 py-md-4"
      style={{
        backgroundColor: "#080808",
        color: "white",
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: "1100px",
        }}
      >
        {/* HEADER */}

        <div
          className="d-flex align-items-center gap-3 p-3 p-md-4 rounded-4 mb-4"
          style={{
            backgroundColor: "#101010",
            border: "1px solid #292929",
          }}
        >
          <div
            className="d-flex justify-content-center align-items-center rounded-3 flex-shrink-0"
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#bfff00",
              color: "#050505",
            }}
          >
            <FaDumbbell size={22} />
          </div>

          <div>
            <h4 className="mb-1 fw-bold">Your Personalized Plan</h4>

            <small className="text-secondary">
              Created specially for you by AS Fitness Club
            </small>
          </div>
        </div>

        {/* LOADING */}

        {loading && (
          <div
            className="rounded-4 p-5 text-center"
            style={{
              backgroundColor: "#101010",
              border: "1px solid #292929",
            }}
          >
            <div
              className="d-flex justify-content-center align-items-center rounded-4 mx-auto mb-4"
              style={{
                width: "70px",
                height: "70px",
                backgroundColor: "#bfff00",
                color: "#050505",
              }}
            >
              <FaRobot size={28} />
            </div>

            <h4 className="fw-bold mb-2">Creating Your Plan...</h4>

            <p className="text-secondary mb-0">
              We're personalizing your meals and workouts.
            </p>

            <div className="mt-4">
              <div
                className="spinner-border"
                style={{
                  color: "#bfff00",
                }}
              ></div>
            </div>
          </div>
        )}

        {/* ERROR */}

        {!loading && !plan && (
          <div
            className="rounded-4 p-5 text-center"
            style={{
              backgroundColor: "#101010",
              border: "1px solid #292929",
            }}
          >
            <FaRobot size={40} color="#bfff00" />

            <h5 className="mt-3 fw-bold">
              Plan Generate Nahi Ho Saka
            </h5>

            <p className="text-secondary mb-0">
              Please refresh the page and try again.
            </p>
          </div>
        )}

        {/* PLAN */}

        {!loading && plan && (
          <>
            {/* SUMMARY */}

            <div className="row g-3 mb-4">
              <div className="col-12 col-md-4">
                <div
                  className="rounded-4 p-4 h-100"
                  style={{
                    backgroundColor: "#101010",
                    border: "1px solid #292929",
                  }}
                >
                  <FaDumbbell
                    size={22}
                    style={{
                      color: "#bfff00",
                    }}
                  />

                  <p className="text-secondary mt-3 mb-1">
                    Your Goal
                  </p>

                  <h5 className="fw-bold mb-0">
                    {plan.summary?.goal}
                  </h5>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div
                  className="rounded-4 p-4 h-100"
                  style={{
                    backgroundColor: "#101010",
                    border: "1px solid #292929",
                  }}
                >
                  <FaFire
                    size={22}
                    style={{
                      color: "#bfff00",
                    }}
                  />

                  <p className="text-secondary mt-3 mb-1">
                    Daily Calories
                  </p>

                  <h5 className="fw-bold mb-0">
                    {plan.summary?.dailyCalories}
                  </h5>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div
                  className="rounded-4 p-4 h-100"
                  style={{
                    backgroundColor: "#101010",
                    border: "1px solid #292929",
                  }}
                >
                  <FaWallet
                    size={22}
                    style={{
                      color: "#bfff00",
                    }}
                  />

                  <p className="text-secondary mt-3 mb-1">
                    Weekly Budget
                  </p>

                  <h5 className="fw-bold mb-0">
                    PKR {plan.summary?.weeklyBudget}
                  </h5>
                </div>
              </div>
            </div>

            {/* MEAL PLAN */}

            <section className="mb-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <FaUtensils
                  style={{
                    color: "#bfff00",
                  }}
                />

                <h4 className="fw-bold mb-0">
                  7-Day Meal Plan
                </h4>
              </div>

              <div className="row g-3">
                {plan.mealPlan?.map((day, index) => (
                  <div
                    className="col-12 col-md-6 col-lg-4"
                    key={index}
                  >
                    <div
                      className="rounded-4 p-3 h-100"
                      style={{
                        backgroundColor: "#101010",
                        border: "1px solid #292929",
                      }}
                    >
                      <div
                        className="d-flex justify-content-between align-items-center mb-3 pb-2"
                        style={{
                          borderBottom: "1px solid #292929",
                        }}
                      >
                        <h5
                          className="fw-bold mb-0"
                          style={{
                            color: "#bfff00",
                          }}
                        >
                          {day.day}
                        </h5>

                        <FaCheckCircle
                          style={{
                            color: "#bfff00",
                          }}
                        />
                      </div>

                      <MealItem
                        title="Breakfast"
                        value={day.breakfast}
                      />

                      <MealItem
                        title="Lunch"
                        value={day.lunch}
                      />

                      <MealItem
                        title="Snack"
                        value={day.snack}
                      />

                      <MealItem
                        title="Dinner"
                        value={day.dinner}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* WORKOUT PLAN */}

            <section className="mb-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <FaDumbbell
                  style={{
                    color: "#bfff00",
                  }}
                />

                <h4 className="fw-bold mb-0">
                  Weekly Workout Plan
                </h4>
              </div>

              <div className="row g-3">
                {plan.workoutPlan?.map((workout, index) => (
                  <div
                    className="col-12 col-md-6"
                    key={index}
                  >
                    <div
                      className="rounded-4 p-4 h-100"
                      style={{
                        backgroundColor: "#101010",
                        border: "1px solid #292929",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5
                          className="fw-bold mb-0"
                          style={{
                            color: "#bfff00",
                          }}
                        >
                          {workout.day}
                        </h5>

                        <span
                          className="px-3 py-1 rounded-pill"
                          style={{
                            backgroundColor: "#1c1c1c",
                            color: "#bfff00",
                            fontSize: "13px",
                          }}
                        >
                          {workout.focus}
                        </span>
                      </div>

                      <div className="mt-3">
                        {workout.exercises?.map(
                          (exercise, exerciseIndex) => (
                            <div
                              key={exerciseIndex}
                              className="d-flex align-items-start gap-2 mb-2"
                            >
                              <FaCheckCircle
                                size={14}
                                className="mt-1 flex-shrink-0"
                                style={{
                                  color: "#bfff00",
                                }}
                              />

                              <span className="text-secondary">
                                {exercise}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* GROCERY LIST */}

            <section className="mb-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <FaShoppingBasket
                  style={{
                    color: "#bfff00",
                  }}
                />

                <h4 className="fw-bold mb-0">
                  Grocery List
                </h4>
              </div>

              <div
                className="rounded-4 p-3 p-md-4"
                style={{
                  backgroundColor: "#101010",
                  border: "1px solid #292929",
                }}
              >
                {plan.groceryList?.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center py-3"
                    style={{
                      borderBottom:
                        index !== plan.groceryList.length - 1
                          ? "1px solid #292929"
                          : "none",
                    }}
                  >
                    <div>
                      <h6 className="mb-1 fw-bold">
                        {item.item}
                      </h6>

                      <small className="text-secondary">
                        {item.quantity}
                      </small>
                    </div>

                    <span
                      className="fw-bold"
                      style={{
                        color: "#bfff00",
                      }}
                    >
                      PKR {item.estimatedCost}
                    </span>
                  </div>
                ))}

                {/* TOTAL */}

                <div
                  className="d-flex justify-content-between align-items-center mt-3 pt-3"
                  style={{
                    borderTop: "1px solid #292929",
                  }}
                >
                  <h5 className="fw-bold mb-0">
                    Estimated Weekly Cost
                  </h5>

                  <h5
                    className="fw-bold mb-0"
                    style={{
                      color: "#bfff00",
                    }}
                  >
                    PKR {plan.estimatedWeeklyCost}
                  </h5>
                </div>
              </div>
            </section>

            {/* FOOTER */}

            <div
              className="rounded-4 p-4 text-center"
              style={{
                backgroundColor: "#101010",
                border: "1px solid #292929",
              }}
            >
              <FaRobot
                size={22}
                style={{
                  color: "#bfff00",
                }}
              />

              <p className="text-secondary mt-2 mb-0">
                Your plan is personalized according to your
                profile, goals, diet, budget and available
                equipment.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* MEAL ITEM */

function MealItem({ title, value }) {
  return (
    <div className="mb-3">
      <small
        className="fw-bold"
        style={{
          color: "#bfff00",
        }}
      >
        {title}
      </small>

      <p
        className="text-secondary mb-0 mt-1"
        style={{
          lineHeight: "1.5",
        }}
      >
        {value}
      </p>
    </div>
  );
}

export default Memberhome;