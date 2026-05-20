import React from "react";

const SemiCircleProgressBar = ({
  stroke = "#02B732",
  strokeWidth = 10,
  background = "#D0D0CE",
  diameter = 200,
  orientation = "up",
  direction = "right",
  showPercentValue = false,
  percentage
}) => {
  const coordinateForCircle = diameter / 2;
  const radius = (diameter - 2 * strokeWidth) / 2;
  const circumference = Math.PI * radius;

  let percentageValue;
  if (percentage > 100) {
    percentageValue = 100;
  } else if (percentage < 0) {
    percentageValue = 0;
  } else {
    percentageValue = percentage;
  }
  const semiCirclePercentage = percentageValue * (circumference / 100);

  let rotation;
  if (orientation === "down") {
    if (direction === "left") {
      rotation = "rotate(180deg) rotateY(180deg)";
    } else {
      rotation = "rotate(180deg)";
    }
  } else {
    if (direction === "right") {
      rotation = "rotateY(180deg)";
    }
  }

  return (
    <div className="semicircle-container" style={{ position: "relative" }}>
      <svg
        width={diameter}
        height={diameter / 2}
        style={{ transform: rotation, overflow: "hidden" }}
      >
        <circle
          cx={coordinateForCircle}
          cy={coordinateForCircle}
          r={radius}
          fill="none"
          stroke={background}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: circumference
          }}
        />
        <circle
          cx={coordinateForCircle}
          cy={coordinateForCircle}
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: semiCirclePercentage,
            transition:
              "stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s"
          }}
        />
      </svg>
      {showPercentValue && (
        <span
          className="semicircle-percent-value"
          style={{
            width: "100%",
            left: "0",
            textAlign: "center",
            bottom: orientation === "down" ? "auto" : "0",
            position: "absolute"
          }}
        >
          {percentage}%
        </span>
      )}
    </div>
  );
};

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
