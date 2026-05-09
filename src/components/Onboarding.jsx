import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(0); // 0: Wordmark, 1: From, 2: To, 3: Visa, 4: Loading
  const [data, setData] = useState({ from: "", to: "", visa: "" });

  const handleNext = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setStep((prev) => prev + 1);
  };

  const steps = [
    {
      id: "wordmark",
      content: (
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "var(--accent)",
          }}
        >
          <h1
            style={{
              fontSize: "6rem",
              color: "var(--primary)",
              textAlign: "center",
              lineHeight: 0.8,
              letterSpacing: "-0.08em",
            }}
          >
            MFTDIA
          </h1>
          <p
            style={{ color: "var(--text)", fontWeight: 900, marginTop: "1rem" }}
          >
            MY FIRST 1000 DAYS IN AMERICA
          </p>
          <button
            onClick={() => setStep(1)}
            style={{
              marginTop: "3rem",
              width: "auto",
              padding: "1rem 3rem",
              backgroundColor: "var(--primary)",
              color: "var(--bg)",
            }}
          >
            LET'S BUILD
          </button>
        </div>
      ),
    },
    {
      id: "from",
      content: (
        <div style={{ padding: "2rem" }}>
          <h2 style={{ fontSize: "3rem", marginBottom: "2rem" }}>
            WHERE ARE YOU COMING FROM?
          </h2>
          <input
            autoFocus
            type="text"
            placeholder="CITY, COUNTRY"
            onKeyDown={(e) =>
              e.key === "Enter" &&
              e.target.value &&
              handleNext("from", e.target.value)
            }
          />
          <p style={{ marginTop: "1rem", opacity: 0.7 }}>
            PRESS ENTER TO CONTINUE
          </p>
        </div>
      ),
    },
    {
      id: "to",
      content: (
        <div style={{ padding: "2rem" }}>
          <h2 style={{ fontSize: "3rem", marginBottom: "2rem" }}>
            WHERE ARE YOU MOVING TO?
          </h2>
          <input
            autoFocus
            type="text"
            placeholder="US CITY"
            onKeyDown={(e) =>
              e.key === "Enter" &&
              e.target.value &&
              handleNext("to", e.target.value)
            }
          />
          <p style={{ marginTop: "1rem", opacity: 0.7 }}>
            PRESS ENTER TO CONTINUE
          </p>
        </div>
      ),
    },
    {
      id: "visa",
      content: (
        <div style={{ padding: "2rem" }}>
          <h2 style={{ fontSize: "3rem", marginBottom: "2rem" }}>
            WHAT VISA ARE YOU ON?
          </h2>
          <select
            autoFocus
            onChange={(e) => handleNext("visa", e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              SELECT VISA TYPE
            </option>
            <option value="F-1">F-1 (STUDENT)</option>
            <option value="H-1B">H-1B (WORK)</option>
            <option value="O-1">O-1 (EXTRAORDINARY ABILITY)</option>
            <option value="EB-1">EB-1 (GREEN CARD)</option>
            <option value="Other">OTHER</option>
            <option value="Not sure yet">NOT SURE YET</option>
          </select>
        </div>
      ),
    },
    {
      id: "stage",
      content: (
        <div style={{ padding: "2rem" }}>
          <h2 style={{ fontSize: "3rem", marginBottom: "2rem" }}>
            WHAT STAGE ARE YOU IN?
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <button onClick={() => handleNext("stage", "Preparing to move")}>
              PREPARING TO MOVE
            </button>
            <button
              onClick={() => handleNext("stage", "Just arrived (Day 1-30)")}
            >
              JUST ARRIVED
            </button>
            <button
              onClick={() => handleNext("stage", "Settling in (Month 2-6)")}
            >
              SETTLING IN
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "loading",
      content: (
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "var(--bg)",
            padding: "2rem",
          }}
        >
          <h2
            style={{
              fontSize: "3rem",
              color: "var(--primary)",
              textAlign: "center",
            }}
          >
            BUILDING YOUR FIRST 1000 DAYS...
          </h2>
          <div
            style={{
              marginTop: "2rem",
              width: "100%",
              height: "8px",
              background: "var(--text)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 3, ease: "linear" }}
              onAnimationComplete={() => onComplete(data)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "var(--primary)",
              }}
            />
          </div>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            style={{
              marginTop: "4rem",
              backgroundColor: "transparent",
              border: "1px solid var(--text)",
              fontSize: "0.6rem",
            }}
          >
            STUCK? RESET APP
          </button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {steps[step].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
