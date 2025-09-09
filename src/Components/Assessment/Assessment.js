import React, { useState } from "react";
import "./Assessment.css";

const questions = [
  "I feel overwhelmed by daily responsibilities",
  "I have trouble sleeping or staying asleep",
  "I feel anxious in social situations",
  "I find it hard to concentrate on tasks",
  "I feel little interest or pleasure in activities",
  "I experience sudden mood changes",
  "I feel isolated or lonely",
  "I have low energy most of the day",
  "I often feel tense or restless",
  "I feel pessimistic about the future",
  "I find it difficult to make decisions",
  "I experience physical symptoms like headaches or stomach issues",
  "I have lost interest in hobbies I once enjoyed",
  "I feel worthless or have low self-esteem",
  "I have thoughts of harming myself",
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
  const [showAlert, setShowAlert] = useState(false);

  const handleAnswer = (val) => {
    const updated = [...answers];
    updated[current] = val;
    setAnswers(updated);
  };

  const next = () => {
    if (answers[current] === undefined) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
      return;
    }

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setAnswers([]);
    setCurrent(0);
    setShowResult(false);
  };

  const totalScore = answers.reduce((a, b) => a + (b || 0), 0);
  let level = "Low Stress";
  if (totalScore >= 16 && totalScore < 30) level = "Moderate Stress";
  if (totalScore >= 30) level = "High Stress";

  return (
    <div className="assessment">
      {showAlert && (
        <div className="custom-alert">
          Please select an option before proceeding.
        </div>
      )}
      {!showResult ? (
        <div className="card">
          <h2>Mental Health Assessment</h2>
          <p className="subtitle">
            Answer honestly to get personalized recommendations
          </p>
          <div className="progress">
            <div
              className="bar"
              style={{ width: `${((current + 1) / questions.length) * 100}%` }}
            />
          </div>
          <p className="question-counter">
            Question {current + 1} of {questions.length}
          </p>
          <p className="question">{questions[current]}</p>
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
              <button
                onClick={() => setCurrent(current - 1)}
                className="btn secondary"
              >
                Previous
              </button>
            )}
            <button
              onClick={next}
              className="btn primary"
            >
              {current === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      ) : (
        <div className="card">
          <h2>Assessment Complete</h2>
          <p className="subtitle">
            Your responses indicate: <span className="font-bold">{level}</span>
          </p>
          <p>
            Score: {totalScore} out of {questions.length * 3}
          </p>
          {level === "High Stress" && (
            <p className="text-red-600 mb-4">
              We strongly recommend speaking with a mental health professional.
            </p>
          )}
          <div className="space-y-2">
            <button className="btn primary w-full">
              Book a therapy session now
            </button>
            <button className="btn secondary w-full">
              Crisis support resources
            </button>
            <button className="btn secondary w-full">
              Immediate coping strategies
            </button>
          </div>
          <button onClick={restart} className="btn secondary mt-6">
            Retake Assessment
          </button>
        </div>
      )}
    </div>
  );
}
