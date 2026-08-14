import React, { useState } from "react";
import { groq } from "../../../../utils/groqAPI";
import {
  FaDumbbell,
  FaPaperPlane,
  FaRobot,
  FaBolt,
} from "react-icons/fa";

function Memberhome() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!input.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const result = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",

        messages: [
          {
            role: "system",
            content: `
You are FitPlan AI, a helpful personal fitness assistant.

Always reply in the same language and writing style as the user.

If the user speaks in Roman Urdu, reply in Roman Urdu.
If the user speaks in English, reply in English.
If the user mixes Roman Urdu and English, naturally mix Roman Urdu and English too.

Never use Hindi/Devanagari script unless the user explicitly asks for it.

Match the user's casual or formal tone naturally.

Keep the conversation natural, friendly, and concise.
Use words like "yrr", "acha", "bas", etc. naturally when appropriate.
Do not overuse them.

Focus mainly on fitness, workouts, nutrition, meal planning,
calories, healthy lifestyle, and general fitness guidance.
            `,
          },

          ...messages,
          userMessage,
        ],
      });

      const aiMessage = {
        role: "assistant",
        content: result.choices[0].message.content,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry yrr, kuch error aa gaya. Dobara try karo.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const askSuggestion = (text) => {
    setInput(text);
  };

  return (
    <div
      className="container-fluid min-vh-100 py-3 py-md-4"
      style={{
        backgroundColor: "#080808",
        color: "white",
      }}
    >
      <div
        className="mx-auto d-flex flex-column"
        style={{
          maxWidth: "1000px",
          height: "calc(100vh - 40px)",
        }}
      >
        {/* HEADER */}
        <div
          className="d-flex justify-content-between align-items-center p-3 p-md-4 rounded-4 mb-3"
          style={{
            backgroundColor: "#101010",
            border: "1px solid #292929",
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex justify-content-center align-items-center rounded-3"
              style={{
                width: "45px",
                height: "45px",
                backgroundColor: "#bfff00",
                color: "#050505",
              }}
            >
              <FaDumbbell size={20} />
            </div>

            <div>
              <h4 className="mb-0 fw-bold">FitPlan AI</h4>

              <small className="text-secondary">
                Your Personal Fitness Assistant
              </small>
            </div>
          </div>

          <div
            className="d-flex align-items-center gap-2 small"
            style={{ color: "#bfff00" }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#bfff00",
                display: "inline-block",
              }}
            ></span>

            Online
          </div>
        </div>

        {/* CHAT AREA */}
        <div
          className="flex-grow-1 overflow-auto px-2 px-md-3 py-3"
          style={{
            scrollbarWidth: "thin",
          }}
        >
          {/* WELCOME SCREEN */}
          {messages.length === 0 && (
            <div
              className="d-flex flex-column justify-content-center align-items-center text-center h-100 px-3"
              style={{
                minHeight: "450px",
              }}
            >
              <div
                className="d-flex justify-content-center align-items-center rounded-4 mb-4"
                style={{
                  width: "70px",
                  height: "70px",
                  backgroundColor: "#bfff00",
                  color: "#050505",
                  boxShadow: "0 0 30px rgba(191, 255, 0, 0.15)",
                }}
              >
                <FaRobot size={30} />
              </div>

              <h2 className="fw-bold mb-2">
                How can I help you?
              </h2>

              <p
                className="text-secondary mb-4"
                style={{
                  maxWidth: "600px",
                  lineHeight: "1.7",
                }}
              >
                Ask me about workouts, nutrition, calories,
                meal plans, or your fitness goals.
              </p>

              <div className="d-flex flex-wrap justify-content-center gap-2">
                <button
                  type="button"
                  className="btn rounded-pill px-3 py-2"
                  onClick={() =>
                    askSuggestion("Create a workout plan for me")
                  }
                  style={{
                    backgroundColor: "#111",
                    border: "1px solid #333",
                    color: "#ddd",
                  }}
                >
                  <FaDumbbell
                    className="me-2"
                    style={{ color: "#bfff00" }}
                  />
                  Workout Plan
                </button>

                <button
                  type="button"
                  className="btn rounded-pill px-3 py-2"
                  onClick={() =>
                    askSuggestion("Suggest a healthy meal plan")
                  }
                  style={{
                    backgroundColor: "#111",
                    border: "1px solid #333",
                    color: "#ddd",
                  }}
                >
                  <FaBolt
                    className="me-2"
                    style={{ color: "#bfff00" }}
                  />
                  Meal Plan
                </button>

                <button
                  type="button"
                  className="btn rounded-pill px-3 py-2"
                  onClick={() =>
                    askSuggestion(
                      "How many calories should I eat?"
                    )
                  }
                  style={{
                    backgroundColor: "#111",
                    border: "1px solid #333",
                    color: "#ddd",
                  }}
                >
                  Calories
                </button>
              </div>
            </div>
          )}

          {/* MESSAGES */}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`d-flex mb-4 ${
                message.role === "user"
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              {/* AI ICON */}
              {message.role === "assistant" && (
                <div
                  className="d-flex justify-content-center align-items-center rounded-3 me-2 flex-shrink-0"
                  style={{
                    width: "35px",
                    height: "35px",
                    backgroundColor: "#bfff00",
                    color: "#050505",
                  }}
                >
                  <FaRobot size={16} />
                </div>
              )}

              {/* MESSAGE */}
              <div
                className="px-3 py-2"
                style={{
                  maxWidth: "75%",
                  lineHeight: "1.6",
                  whiteSpace: "pre-wrap",
                  fontSize: "15px",

                  backgroundColor:
                    message.role === "user"
                      ? "#bfff00"
                      : "#151515",

                  color:
                    message.role === "user"
                      ? "#050505"
                      : "#eeeeee",

                  border:
                    message.role === "assistant"
                      ? "1px solid #292929"
                      : "none",

                  borderRadius:
                    message.role === "user"
                      ? "18px 18px 4px 18px"
                      : "4px 18px 18px 18px",
                }}
              >
                {message.content}
              </div>
            </div>
          ))}

          {/* LOADING */}
          {loading && (
            <div className="d-flex align-items-center mb-4">
              <div
                className="d-flex justify-content-center align-items-center rounded-3 me-2"
                style={{
                  width: "35px",
                  height: "35px",
                  backgroundColor: "#bfff00",
                  color: "#050505",
                }}
              >
                <FaRobot size={16} />
              </div>

              <div
                className="px-4 py-3 rounded-4"
                style={{
                  backgroundColor: "#151515",
                  border: "1px solid #292929",
                }}
              >
                <span
                  className="spinner-grow spinner-grow-sm me-1"
                  style={{ color: "#bfff00" }}
                ></span>

                <span
                  className="spinner-grow spinner-grow-sm me-1"
                  style={{
                    color: "#bfff00",
                    animationDelay: "0.15s",
                  }}
                ></span>

                <span
                  className="spinner-grow spinner-grow-sm"
                  style={{
                    color: "#bfff00",
                    animationDelay: "0.3s",
                  }}
                ></span>
              </div>
            </div>
          )}
        </div>

        {/* INPUT AREA */}
        <div className="mt-2">
          <form
            onSubmit={handleClick}
            className="d-flex align-items-center gap-2 p-2 rounded-4"
            style={{
              backgroundColor: "#111",
              border: "1px solid #333",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={handleChange}
              placeholder="Ask anything about your fitness..."
              className="form-control border-0 shadow-none"
              style={{
                backgroundColor: "transparent",
                color: "white",
                outline: "none",
                boxShadow: "none",
              }}
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn d-flex justify-content-center align-items-center rounded-3"
              style={{
                width: "45px",
                height: "45px",
                backgroundColor: "#bfff00",
                color: "#050505",
                opacity:
                  loading || !input.trim() ? 0.5 : 1,
              }}
            >
              <FaPaperPlane />
            </button>
          </form>

          <p
            className="text-center mb-0 mt-2"
            style={{
              color: "#555",
              fontSize: "11px",
            }}
          >
            FitPlan AI can make mistakes. Always verify important
            information.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Memberhome;