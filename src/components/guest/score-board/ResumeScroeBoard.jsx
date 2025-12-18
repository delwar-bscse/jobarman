import React from "react";
import SemiCircleProgressBar from "react-progressbar-semicircle";
const ResumeScorecard = ({ score, total = 100 }) => {
  return (
    <div className="my-5 text-center">
      <h2 className="text-[#123499] text-2xl font-medium text-nowrap">
        Your Resume Scorecard & Insights
      </h2>
      <h2 className="text-2xl font-semibold text-center">Your Score</h2>
      {/* <SemiCircleProgressBar percentage={33} showPercentValue />; */}
      <div className="flex items-center justify-center">
        <div style={{ position: "relative", width: "200px", height: "100px" }}>
          <SemiCircleProgressBar
            size={{ width: 400, height: 700 }}
            percentage={score}
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
            {score}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeScorecard;
