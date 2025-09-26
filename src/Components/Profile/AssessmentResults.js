import React, { useEffect, useState } from "react";
import { useUser } from "../../UserContext";

const AssessmentResults = () => {
  const { user } = useUser();
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchAssessment = async () => {
      try {
        const res = await fetch(`http://localhost/Healhub/api/get_assessment.php?user_id=${user.id}`);
        const data = await res.json();
        if (data.success) {
          // Parse JSON strings from database
          const parsedAssessment = {
            ...data.assessment,
            answers: JSON.parse(data.assessment.answers || '[]'),
            categoryScores: JSON.parse(data.assessment.category_scores || '{}')
          };
          setAssessment(parsedAssessment);
        }
      } catch (error) {
        console.error("Error fetching assessment:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, [user]);

  if (loading) return <p>Loading assessment results...</p>;
  if (!assessment) return <p>No assessment results found. Please take the assessment.</p>;

  const totalScore = assessment.answers.reduce((sum, val) => sum + (val || 0), 0);
  const maxScore = assessment.answers.length * 3;

  return (
    <div className="profile-section">
      <h2>Assessment Results</h2>
      <p><strong>Total Score:</strong> {totalScore} / {maxScore}</p>
      <p><strong>Recommended Therapy:</strong> {assessment.recommended_therapy.replace(/([A-Z])/g, " $1")}</p>
      <div>
        <h3>Category Scores:</h3>
        <ul>
          {Object.entries(assessment.categoryScores).map(([category, score]) => (
            <li key={category}>{category.replace(/([A-Z])/g, " $1")}: {score}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AssessmentResults;
