import React from "react";
import SemiCircleProgressBar from "react-progressbar-semicircle";
const ResumeScorecard = ({ score, total = 100 }) => {
  return (
    <div className="my-5 text-center">
      <h2 className="text-[#123499] text-xl font-medium">
        Your Resume Scorecard & Insights
      </h2>
      <h2 className="text-2xl font-semibold text-center">Your Score</h2>
      {/* <SemiCircleProgressBar percentage={33} showPercentValue />; */}
      <div className="flex items-center justify-center">
        <div className="relative">
          <SemiCircleProgressBar
            percentage={score}
            stroke="#2A57DE"
            strokeWidth={30}
            background="#d6d6d6"
            diameter={320}
          />
          <p className="absolute top-[70%] left-[50%] text-[#2A57DE] text-4xl font-bold transform -translate-x-1/2 -translate-y-1/2">
            {score}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeScorecard;
