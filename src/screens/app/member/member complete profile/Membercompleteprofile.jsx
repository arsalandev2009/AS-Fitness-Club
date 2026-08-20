import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from '../../../../assets/FitPlan_AI_Individual_Assets/logo.png'
import "./MemberCompleteProfile.css";
// import { useDispatch } from "react-redux";
// import { saveMemberData } from "../../../../redux/features/memberSlice";
import {
  FaUser,
  FaBullseye,
  FaDumbbell,
  FaAppleWhole,
  FaWallet,
  FaShieldHalved,
  FaFire,
  FaPersonRunning,
  FaScaleBalanced,
  FaPersonWalking,
  FaStar,
  FaCrown,
  FaPerson,
  FaLeaf,
  FaDrumstickBite,
  FaArrowRight,
  FaLightbulb,
  FaChartLine,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../../utils/supabase";
import { groq } from "../../../../utils/groqAPI";


function MemberCompleteProfile() {
 
  const navigate=useNavigate()

  const [logoutPopup,setLogoutPopup]=useState()
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal: "",
    activity: "",
    trainingExperience: "",
    daysPerWeek: "",
    equipment: "",
    diet: "",
    allergies: "",
    cuisine: "",
    budget: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
  e.preventDefault();
 setGenerating(true);
  
  const { data: { user }, error: userError, } = await supabase.auth.getUser();

  if (userError || !user) {
    setGenerating(false)
    navigate("/login");
    return;
  }

  // Existing user ki Auth table wali row update karo
  const { data: getData, error: getError } = await supabase.from("Auth").update({ age: formData.age, gender: formData.gender, height: formData.height, weight: formData.weight, goal: formData.goal, activity: formData.activity, trainingExperience: formData.trainingExperience, days: formData.daysPerWeek, equiqments: formData.equipment, dietPreference: formData.diet, allergies: formData.allergies, budget: formData.budget, }) .eq("id", user.id);

  if (getError) {
    console.log(getError);
    alert("Error Getting User");
    setGenerating(false)
    return;

  }
  
const prompt = `
You are FitPlan AI.

Create a very concise personalized fitness and nutrition plan using ONLY the provided user data.

User Data:
Age: ${formData.age}
Gender: ${formData.gender}
Height: ${formData.height}
Weight: ${formData.weight}
Goal: ${formData.goal}
Activity: ${formData.activity}
Experience: ${formData.trainingExperience}
Training Days: ${formData.daysPerWeek}
Equipment: ${formData.equipment}
Diet: ${formData.diet}
Allergies: ${formData.allergies}
Cuisine: ${formData.cuisine}
Budget: ${formData.budget}

Return ONLY one valid JSON object.

IMPORTANT:
- The COMPLETE JSON response MUST be UNDER 1000 CHARACTERS.
- Keep every value extremely short.
- Do not add explanations.
- Do not use Markdown.
- Do not add fields.
- Do not omit required fields.
- Use short names and concise values.
- Use numbers instead of sentences wherever possible.
- Foods should contain only short food names.
- Exercise notes must be very short.
- Keep grocery items minimal.
- safetyNote must be very short.
- The response must start with { and end with }.
- Use double quotes for all JSON keys and strings.
- No trailing commas.

Use EXACTLY this structure:

{
"t":{"b":0,"c":0,"k":0,"p":0,"ca":0,"f":0},
"w":[{"d":"","s":"","e":[{"n":"","x":0,"r":"","z":0}]}],
"m":[
{"d":"1","b":"","s":"","l":"","e":"","n":""},
{"d":"2","b":"","s":"","l":"","e":"","n":""},
{"d":"3","b":"","s":"","l":"","e":"","n":""},
{"d":"4","b":"","s":"","l":"","e":"","n":""},
{"d":"5","b":"","s":"","l":"","e":"","n":""},
{"d":"6","b":"","s":"","l":"","e":"","n":""},
{"d":"7","b":"","s":"","l":"","e":"","n":""}
],
"g":[{"i":"","q":0,"u":""}],
"p":{"w":"","a":"","n":"","g":""},
"safe":""
}

KEYS:
t = nutrition targets
b = BMR
c = TDEE
k = target calories
p = protein
ca = carbs
f = fat
w = workout
d = day
s = split
e = exercises
n = name
x = sets
r = reps
z = rest seconds
m = meal plan
b = breakfast
s = morning snack
l = lunch
e = evening snack
n = dinner
g = grocery
i = item
q = quantity
u = unit
p = progress
w = weight tracking
a = workout adherence
n = nutrition adherence
g = guidance
safe = safety note

For meals, use ONLY the meal name as a short string.
Example: "Oats+Eggs"

Do NOT include calories/macros inside individual meals.
Only return the nutrition targets in "t".

Do NOT add any additional fields.

The final JSON MUST be less than 1000 characters.

`;
try{
  const handleGroq = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [{ role: "user", content: prompt, }],
    response_format:{ type:'json_object' }
    });
    
    
    const groqResult = handleGroq.choices[0].message.content

    const {data:putData,error:putError} = await supabase.from('Auth').update({promptResult:groqResult}).eq("id",user.id).single()
    if(putError){
    console.log(putError.message);
    alert("Error saving plan");
    setGenerating(false);
    return;
    }

    setGenerating(false)
    navigate("/member-dashboard");
    window.location.reload()
  }catch(error){

    const {data,geterror}=await supabase.from('Auth').update({age:null,gender:null}).eq('id',user.id)

    console.log("Groq Error:", geterror);

  Swal.fire({
    icon: "error",
    title: "Generation Failed",
    text: "Your AI plan could not be generated. Please try again.",
  });

  setGenerating(false);
  }
      
      // Redux mein bhi save
      // dispatch(saveMemberData(formData));
      
    };

const handleLogout=async(e)=>{
e.preventDefault()

const {data} = await supabase.auth.signOut()
navigate('/')
}
  return (
    <div className="fit-page min-vh-100 text-white">

      {/* HEADER */}

     <header className="fit-header border-bottom">

  <div className="container-fluid">
    <div className="d-flex justify-content-between align-items-center">

      <img src={Logo} alt="" width={220} className="my-2" />

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


      {/* MAIN */}

      <main className="container-fluid fit-main">

<div className="fit-intro text-center">
  <p className="fit-tagline mb-1">
    Let’s Build Your Fitness Plan 💪
  </p>

  <p className="fit-header-text mb-0">
   Tell us a little about yourself — your goals, routine, and preferences — and we’ll use your answers to create a plan that fits you.

  </p>
</div>

        <form onSubmit={handleSubmit}>

          <div className="row g-3">


            {/* PERSONAL INFORMATION */}
            <div className="col-12 col-xl-6">

              <div className="fit-section rounded-3 h-100">

                <div className="d-flex align-items-center gap-3 mb-4">

                  <div className="fit-section-icon">
                    <FaUser />
                  </div>

                  <div>
                    <h4 className="fit-section-title mb-1">
                      Personal Information
                    </h4>

                    <p className="fit-section-subtitle mb-0">
                      Tell us about yourself
                    </p>
                  </div>

                </div>


                <div className="row g-3">

                  <div className="col-12 col-md-6">

                    <label className="form-label fit-label">
                      Age
                    </label>

                    <div className="input-group">

                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="e.g. 25"
                        required
                        className="form-control fit-input"
                      />

                      

                    </div>

                  </div>


                  <div className="col-12 col-md-6">

                    <label className="form-label fit-label">
                      Biological Sex
                    </label>

                    <div className="row g-2">

                      <div className="col-6">

                        <label className={`fit-option d-flex align-items-center gap-2 rounded-2 ${
                          formData.gender === "Male" ? "selected" : ""
                        }`}>

                          <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === "Male"}
                            onChange={handleChange}
                            required
                          />

                          
                          Male

                        </label>

                      </div>


                      <div className="col-6">

                        <label className={`fit-option d-flex align-items-center gap-2 rounded-2 ${
                          formData.gender === "Female" ? "selected" : ""
                        }`}>

                          <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === "Female"}
                            onChange={handleChange}
                          />

                         
                          Female

                        </label>

                      </div>

                    </div>

                  </div>


                  <div className="col-12 col-md-6">

                    <label className="form-label fit-label">
                      Height
                    </label>

                    <div className="input-group">

                      <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        placeholder="e.g. 175"
                        required
                        className="form-control fit-input"
                      />

                      <span className="input-group-text">
                        cm
                      </span>

                    </div>

                  </div>


                  <div className="col-12 col-md-6">

                    <label className="form-label fit-label">
                      Weight
                    </label>

                    <div className="input-group">

                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        placeholder="e.g. 70"
                        required
                        className="form-control fit-input"
                      />

                      <span className="input-group-text">
                        kg
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* GOAL & ACTIVITY */}
            <div className="col-12 col-xl-6">

              <div className="fit-section rounded-3 h-100">

                <div className="d-flex align-items-center gap-3 mb-4">

                  <div className="fit-section-icon">
                    <FaBullseye />
                  </div>

                  <div>
                    <h4 className="fit-section-title mb-1">
                      Goal & Activity
                    </h4>

                    <p className="fit-section-subtitle mb-0">
                      Your goals and daily activity level
                    </p>
                  </div>

                </div>


                <div className="row g-3">

                  {/* GOAL */}

                  <div className="col-12 col-md-6">

                    <label className="form-label fit-label">
                      Your Primary Goal
                    </label>

                    <div className="d-flex flex-column gap-2">


                      <label className={`fit-option rounded-2 ${formData.goal === "Fat Loss" ? "selected" : ""}`}>

                        <input
                          type="radio"
                          name="goal"
                          value="Fat Loss"
                          checked={formData.goal === "Fat Loss"}
                          onChange={handleChange}
                          required
                        />

                      <FaFire/>
                        Fat Loss
                       

                      </label>


                      <label className={`fit-option rounded-2 ${
                        formData.goal === "Muscle Gain" ? "selected" : ""
                      }`}>

                        <input
                          type="radio"
                          name="goal"
                          value="Muscle Gain"
                          checked={formData.goal === "Muscle Gain"}
                          onChange={handleChange}
                        />

                        <FaDumbbell />
                        Muscle Gain

                      </label>


                      <label className={`fit-option rounded-2 ${
                        formData.goal === "Weight Maintenance" ? "selected" : ""
                      }`}>

                        <input
                          type="radio"
                          name="goal"
                          value="Weight Maintenance"
                          checked={
                            formData.goal === "Weight Maintenance"
                          }
                          onChange={handleChange}
                        />

                        <FaScaleBalanced />
                        Weight Maintenance

                      </label>


                      <label className={`fit-option rounded-2 ${
                        formData.goal === "General Fitness" ? "selected" : ""
                      }`}>

                        <input
                          type="radio"
                          name="goal"
                          value="General Fitness"
                          checked={
                            formData.goal === "General Fitness"
                          }
                          onChange={handleChange}
                        />

                        <FaPersonRunning />
                        General Fitness

                      </label>

                    </div>

                  </div>


                  {/* ACTIVITY */}

                  <div className="col-12 col-md-6">

                    <label className="form-label fit-label">
                      Activity Level
                    </label>

                    <div className="d-flex flex-column gap-2">


                      <label className={`fit-option rounded-2 ${
                        formData.activity === "Sedentary"
                          ? "selected"
                          : ""
                      }`}>

                        <input
                          type="radio"
                          name="activity"
                          value="Sedentary"
                          checked={
                            formData.activity === "Sedentary"
                          }
                          onChange={handleChange}
                          required
                        />

                        <FaPerson />

                        Sedentary
                        <small>(little or no exercise)</small>

                      </label>


                      <label className={`fit-option rounded-2 ${
                        formData.activity === "Lightly Active"
                          ? "selected"
                          : ""
                      }`}>

                        <input
                          type="radio"
                          name="activity"
                          value="Lightly Active"
                          checked={
                            formData.activity === "Lightly Active"
                          }
                          onChange={handleChange}
                        />

                        <FaPersonWalking />

                        Lightly Active
                        <small>(1-3 days/week)</small>

                      </label>


                      <label className={`fit-option rounded-2 ${
                        formData.activity === "Moderately Active"
                          ? "selected"
                          : ""
                      }`}>

                        <input
                          type="radio"
                          name="activity"
                          value="Moderately Active"
                          checked={
                            formData.activity === "Moderately Active"
                          }
                          onChange={handleChange}
                        />

                        <FaPersonRunning />

                        Moderately Active
                        <small>(3-5 days/week)</small>

                      </label>


                      <label className={`fit-option rounded-2 ${
                        formData.activity === "Very Active"
                          ? "selected"
                          : ""
                      }`}>

                        <input
                          type="radio"
                          name="activity"
                          value="Very Active"
                          checked={
                            formData.activity === "Very Active"
                          }
                          onChange={handleChange}
                        />

                        <FaPersonRunning />

                        Very Active
                        <small>(6-7 days/week)</small>

                      </label>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* TRAINING */}
            <div className="col-12">

              <div className="fit-section rounded-3">

                <div className="d-flex align-items-center gap-3 mb-4">

                  <div className="fit-section-icon">
                    <FaDumbbell />
                  </div>

                  <div>
                    <h4 className="fit-section-title mb-1">
                      Training & Access
                    </h4>

                    <p className="fit-section-subtitle mb-0">
                      Help us design the right workout plan for you
                    </p>
                  </div>

                </div>


                <div className="row g-4">


                  {/* EXPERIENCE */}

                  <div className="col-12 col-lg-5">

                    <label className="form-label fit-label">
                      Training Experience
                    </label>

                    <div className="row g-2">


                      <div className="col-12 col-sm-4">

                        <label className={`fit-option rounded-2 ${
                          formData.trainingExperience === "Beginner"
                            ? "selected"
                            : ""
                        }`}>

                          <input
                            type="radio"
                            name="trainingExperience"
                            value="Beginner"
                            checked={
                              formData.trainingExperience === "Beginner"
                            }
                            onChange={handleChange}
                            required
                          />

                          <FaStar />
                          Beginner

                        </label>

                      </div>


                      <div className="col-12 col-sm-4">

                        <label className={`fit-option rounded-2 ${
                          formData.trainingExperience === "Intermediate"
                            ? "selected"
                            : ""
                        }`}>

                          <input
                            type="radio"
                            name="trainingExperience"
                            value="Intermediate"
                            checked={
                              formData.trainingExperience ===
                              "Intermediate"
                            }
                            onChange={handleChange}
                          />
<FaChartLine />
                          Intermediate

                        </label>

                      </div>


                      <div className="col-12 col-sm-4">

                        <label className={`fit-option rounded-2 ${
                          formData.trainingExperience === "Advanced"
                            ? "selected"
                            : ""
                        }`}>

                          <input
                            type="radio"
                            name="trainingExperience"
                            value="Advanced"
                            checked={
                              formData.trainingExperience === "Advanced"
                            }
                            onChange={handleChange}
                          />

                          <FaCrown />
                          Advanced

                        </label>

                      </div>

                    </div>

                  </div>


                  {/* DAYS */}

                  <div className="col-12 col-lg-3">

                    <label className="form-label fit-label">
                      Days Available Per Week
                    </label>

                    <div className="row g-2">

                      {["3", "4", "5", "6"].map((day, index) => (

                        <div
                          className="col-6 col-sm-3 col-lg-6"
                          key={day}
                        >

                          <label className={`fit-option rounded-2 text-center ${
                            formData.daysPerWeek === day
                              ? "selected"
                              : ""
                          }`}>

                            <input
                              type="radio"
                              name="daysPerWeek"
                              value={day}
                              checked={
                                formData.daysPerWeek === day
                              }
                              onChange={handleChange}
                              required={index === 0}
                            />

                            <strong>{day}</strong>
                            <span> Days</span>

                          </label>

                        </div>

                      ))}

                    </div>

                  </div>


                  {/* EQUIPMENT */}

                  <div className="col-12 col-lg-4">

                    <label className="form-label fit-label">
                      Equipment Access
                    </label>

                    <div className="row g-2">


                      <div className="col-12 col-md-6 col-lg-12">

                        <label className={`fit-option rounded-2 ${
                          formData.equipment === "Full Gym"
                            ? "selected"
                            : ""
                        }`}>

                          <input
                            type="radio"
                            name="equipment"
                            value="Full Gym"
                            checked={
                              formData.equipment === "Full Gym"
                            }
                            onChange={handleChange}
                            required
                          />

                          <FaDumbbell />
                          Full Gym

                        </label>

                      </div>


                      <div className="col-12 col-md-6 col-lg-12">

                        <label className={`fit-option rounded-2 ${
                          formData.equipment === "Dumbbells at Home"
                            ? "selected"
                            : ""
                        }`}>

                          <input
                            type="radio"
                            name="equipment"
                            value="Dumbbells at Home"
                            checked={
                              formData.equipment ===
                              "Dumbbells at Home"
                            }
                            onChange={handleChange}
                          />

                          <FaDumbbell />
                          Dumbbells at Home

                        </label>

                      </div>


                      <div className="col-12">

                        <label className={`fit-option rounded-2 ${
                          formData.equipment === "Bodyweight Only"
                            ? "selected"
                            : ""
                        }`}>

                          <input
                            type="radio"
                            name="equipment"
                            value="Bodyweight Only"
                            checked={
                              formData.equipment ===
                              "Bodyweight Only"
                            }
                            onChange={handleChange}
                          />

                          <FaPerson />
                          Bodyweight Only

                        </label>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* DIET */}
            <div className="col-12 col-xl-8">

              <div className="fit-section rounded-3 h-100">

                <div className="d-flex align-items-center gap-3 mb-4">

                  <div className="fit-section-icon">
                    <FaAppleWhole />
                  </div>

                  <div>
                    <h4 className="fit-section-title mb-1">
                      Diet & Preferences
                    </h4>

                    <p className="fit-section-subtitle mb-0">
                      Your food preferences and restrictions
                    </p>
                  </div>

                </div>


                <div className="row g-3">


                  <div className="col-12 col-lg-4">

                    <label className="form-label fit-label">
                      Diet Preference
                    </label>

                    <div className="row g-2">

                      <div className="col-6">

                        <label className={`fit-option rounded-2 ${
                          formData.diet === "Vegetarian"
                            ? "selected"
                            : ""
                        }`}>

                          <input
                            type="radio"
                            name="diet"
                            value="Vegetarian"
                            checked={
                              formData.diet === "Vegetarian"
                            }
                            onChange={handleChange}
                            required
                          />

                          <FaLeaf />
                          Vegetarian

                        </label>

                      </div>


                      <div className="col-6">

                        <label className={`fit-option rounded-2 ${
                          formData.diet === "Non-Vegetarian"
                            ? "selected"
                            : ""
                        }`}>

                          <input
                            type="radio"
                            name="diet"
                            value="Non-Vegetarian"
                            checked={
                              formData.diet === "Non-Vegetarian"
                            }
                            onChange={handleChange}
                          />

                          <FaDrumstickBite />
                          Non-Vegetarian

                        </label>

                      </div>

                    </div>

                  </div>


                  <div className="col-12 col-lg-5">

                    <label className="form-label fit-label">
                      Allergies / Dietary Restrictions
                    </label>

                    <input
                      type="text"
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleChange}
                      placeholder="e.g. Nuts, Gluten, Lactose"
                      className="form-control fit-input"
                    />

                    <small className="text-secondary">
                      Separate multiple items with commas
                    </small>

                  </div>


                  {/* <div className="col-12 col-lg-3">

                    <label className="form-label fit-label">
                      Preferred Cuisine{" "}
                      <span className="text-secondary">
                        (optional)
                      </span>
                    </label>

                    <select
                      name="cuisine"
                      value={formData.cuisine}
                      onChange={handleChange}
                      className="form-select fit-input"
                    >

                      <option value="">
                        Select cuisine
                      </option>

                      <option value="Pakistani">
                        Pakistani
                      </option>

                      <option value="Indian">
                        Indian
                      </option>

                      <option value="Mediterranean">
                        Mediterranean
                      </option>

                      <option value="Chinese">
                        Chinese
                      </option>

                      <option value="Western">
                        Western
                      </option>

                    </select>

                  </div> */}

                </div>

              </div>

            </div>

            {/* BUDGET */}
            <div className="col-12 col-xl-4">

              <div className="fit-section rounded-3 h-100">

                <div className="d-flex align-items-center gap-3 mb-4">

                  <div className="fit-section-icon">
                    <FaWallet />
                  </div>

                  <div>
                    <h4 className="fit-section-title mb-1">
                      Budget
                    </h4>

                    <p className="fit-section-subtitle mb-0">
                      Set your weekly grocery budget
                    </p>
                  </div>

                </div>


                <label className="form-label fit-label">
                  Weekly Grocery Budget
                </label>

                <div className="input-group">

                  <span className="input-group-text">
                    PKR
                  </span>

                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="minimum 2000"
                    min={'2000'}
                    required
                    className="form-control fit-input"
                  />

                </div>


                <div className="mt-3 d-flex gap-2 align-items-start text-secondary small">

                  <FaLightbulb className="fit-lightbulb" />

                  <span>
                    This budget will help us create a meal
                    plan that fits your pocket.
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* FOOTER */}

          <div className="fit-footer rounded-3 p-3 mt-3 text-center">
  {generating ? (
  <div className="text-center mt-3">

    <div
      className="spinner-border"
      style={{ color: "#bfff00" }}
      role="status"
    >
      <span className="visually-hidden">
        Loading...
      </span>
    </div>

    <h5 className="fw-bold mt-3 mb-1">
      Generating Your{" "}
      <span style={{ color: "#bfff00" }}>
        Fit Plan
      </span>
      ...
    </h5>

    <p className="text-secondary mb-0">
      AI is creating your personalized plan.
    </p>

  </div>
) : (
  <button
    type="submit"
    className="btn fw-bold px-4 py-3"
    style={{
      backgroundColor: "#bfff00",
      color: "#000"
    }}
  >
    Create Fit Plan <FaArrowRight/>
  </button>
)}
</div>


        </form>

      </main>

    </div>
  );
}

export default MemberCompleteProfile;