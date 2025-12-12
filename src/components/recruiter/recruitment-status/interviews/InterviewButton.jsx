"use client";
import { myFetch } from "utils/myFetch";

export default function InterviewButton() {
  const handleInterview = async () => {
    const res = await myFetch(
      "/application/start-interview/6937a3da56cca42f59e5742a",
      {
        method: "POST",
      }
    );

    if (res.success && res.data) {
      window.open(res.data, "_blank", "noopener,noreferrer");
    }

    console.log("res", res);
  };
  return (
    <div>
      <button
        onClick={handleInterview}
        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
      >
        Start Interview
      </button>
    </div>
  );
}
