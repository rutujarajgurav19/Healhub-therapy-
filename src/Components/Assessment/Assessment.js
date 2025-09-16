import React, { useState } from "react";
import "./Assessment.css";
import Alert from "../Alert/Alert";

// Questions with therapy category tags
const questions = [
  { text: "I feel overwhelmed by daily responsibilities", category: "DepressionAnxietyStress" },
  { text: "I have trouble sleeping or staying asleep", category: "DepressionAnxietyStress" },
  { text: "I feel anxious in social situations", category: "DepressionAnxietyStress" },
  { text: "I find it hard to concentrate on tasks", category: "DepressionAnxietyStress" },
  { text: "I struggle to maintain healthy relationships", category: "RelationshipCounselling" },
  { text: "I feel stressed balancing parenting and personal life", category: "Parenting" },
  { text: "I have experienced a traumatic event that affects me", category: "Trauma" },
  { text: "I have thoughts of harming myself", category: "Trauma" },
  { text: "I face issues with sleep, diet, or work-life balance", category: "LifestyleIssues" },
  { text: "I often feel tense or restless", category: "DepressionAnxietyStress" },
  { text: "I feel isolated or lonely", category: "RelationshipCounselling" },
];

const options = [
  { text: "Never", value: 0 },
  { text: "Sometimes", value: 1 },
  { text: "Often", value: 2 },
  { text: "Always", value: 3 },
];

export default function Assessment() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [recommendedTherapy, setRecommendedTherapy] = useState("");

  const handleAnswer = (val) => {
    const updated = [...answers];
    updated[current] = val;
    setAnswers(updated);
  };

  const next = () => {
    if (answers[current] === undefined) {
      setAlertType("error");
      setMessage("Please select an option before proceeding.");
      return;
    }

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    // Calculate category scores
    const categoryScores = answers.reduce((acc, val, index) => {
      const category = questions[index].category;
      acc[category] = (acc[category] || 0) + (val || 0);
      return acc;
    }, {});

    // Pick the category with the highest score
    const bestCategory = Object.keys(categoryScores).reduce((a, b) =>
      categoryScores[a] > categoryScores[b] ? a : b
    );

    setRecommendedTherapy(bestCategory);

    // Save data to backend
    saveResult(categoryScores, bestCategory);

    setShowResult(true);
  };

  const saveResult = async (categoryScores, bestCategory) => {
    try {
await fetch("http://localhost/healhub/api/assessment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          categoryScores,
          recommendedTherapy: bestCategory,
          userId: "123", // Replace with actual logged-in user ID
        }),
      });
    } catch (err) {
      console.error("Error saving result:", err);
    }
  };

  const restart = () => {
    setAnswers([]);
    setCurrent(0);
    setShowResult(false);
    setRecommendedTherapy("");
  };

  return (
    <div className="assessment">
      <Alert type={alertType} message={message} onClose={() => setMessage("")} />
      {!showResult ? (
        <div className="card">
          <h2>Mental Health Assessment</h2>
          <p className="subtitle">Answer honestly to get personalized recommendations</p>
          <div className="progress">
            <div
              className="bar"
              style={{ width: `${((current + 1) / questions.length) * 100}%` }}
            />
          </div>
          <p className="question-counter">
            Question {current + 1} of {questions.length}
          </p>
          <p className="question">{questions[current].text}</p>
          <div className="choices">
            {options.map((opt, i) => {
              const isSelected = answers[current] === opt.value;
              return (
                <div
                  key={i}
                  className="choice-row"
                  onClick={() => handleAnswer(opt.value)}
                >
                  <div className={`choice-circle ${isSelected ? "selected" : ""}`}>
                    {isSelected ? "●" : "○"}
                  </div>
                  <div className="choice-box">{opt.text}</div>
                </div>
              );
            })}
          </div>
          <div className={`button-container ${current === 0 ? "single" : ""}`}>
            {current > 0 && (
              <button onClick={() => setCurrent(current - 1)} className="btn secondary">
                Previous
              </button>
            )}
            <button onClick={next} className="btn primary">
              {current === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      ) : (
        <div className="card result-card">
          <h2>Assessment Complete</h2>
          <p className="subtitle">
            Your responses indicate: <span className="font-bold">{recommendedTherapy}</span>
          </p>

          <p>
            Questions answered: {answers.filter(a => a !== undefined).length} out of {questions.length}
          </p>

          {/* Therapy Recommendation */}
          <div className="therapy-recommendation">
            <h3>Recommended Therapy</h3>
            <p>{recommendedTherapy.replace(/([A-Z])/g, " $1")}</p>
          </div>

          {/* Action Buttons */}
          <div className="actions">
            <button
              className="btn primary w-full"
              onClick={() => {
                const isAuthenticated = false; // Replace with actual auth check
                if (!isAuthenticated) {
                  window.location.href = "/signup";
                } else {
                  window.location.href = "/therapist";
                }
              }}
            >
              Book a therapy session now
            </button>
            <button onClick={restart} className="btn secondary w-full">
              Retake Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
