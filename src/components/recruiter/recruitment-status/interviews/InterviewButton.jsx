"use client";
import { useState } from "react";
import { toast } from "sonner";
import { myFetch } from "utils/myFetch";

export default function InterviewButton({ item }) {
  const [loading, setLoading] = useState(false);

  const handleInterview = async () => {
    setLoading(true);
    const toastId = toast.loading("Loading...");

    try {
      const res = await myFetch(`/application/start-interview/${item}`, {
        method: "POST",
      });

      if (res.success && res.data) {
        window.open(res.data, "_blank", "noopener,noreferrer");
        toast.success("Interview link opened");
      } else {
        toast.error(res.message || "Failed to get Zoom meeting link");
      }
    } catch (error) {
      toast.error(error.message || "Server error");
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={handleInterview}
      className={`flex-1 text-white font-semibold py-3 rounded-lg transition
        ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }
      `}
    >
      {loading ? "Starting..." : "Start Interview"}
    </button>
  );
}
