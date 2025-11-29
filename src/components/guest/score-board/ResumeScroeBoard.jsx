import React from "react";
import SemiCircleProgressBar from "react-progressbar-semicircle";
const ResumeScorecard = ({ score = 52, total = 100 }) => {
  const percentage = (score / total) * 100;

  return (
    <div className="my-5">
      <h2 className="text-[#123499] text-xl font-medium">
        Your Resume Scorecard & Insights
      </h2>
      <h2 className="text-2xl font-semibold text-center">Your Score</h2>
      {/* <SemiCircleProgressBar percentage={33} showPercentValue />; */}
      <div style={{ position: "relative", width: "200px", height: "100px" }}>
        <SemiCircleProgressBar
          size={{ width: 400, height: 700 }}
          percentage={63}
          stroke="#2A57DE"
          strokeWidth={25}
          background="#d6d6d6"
        />
        <div
          style={{
            position: "absolute",
            top: "70%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#2A57DE",
          }}
        >
          33%
        </div>
      </div>
    </div>
  );
};

export default ResumeScorecard;
