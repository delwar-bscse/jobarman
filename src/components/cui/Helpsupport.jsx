"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { myFetch } from "../../../utils/myFetch";

export default function HelpSupport() {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim() || !description.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Please Fill All Fields",
        text: "Both reason and message are required.",
      });
      return;
    }

    try {
      const res = await myFetch("/support", {
        method: "POST",
        body: { reason, description },
      });

      if (res.success) {
        toast.success("support create successfully");
      } else {
        toast.error(res.error || "support create failed");
      }
    } catch (err) {
      console.error(err.message || "support create failed");
    }

    setReason("");
    setDescription("");
  };

  return (
    <div className="w-full flex justify-center mt-20 py-8">
      <div className="px-3 md:px-10 w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          GET IN TOUCH
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Reason Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason
            </label>
            <input
              type="text"
              placeholder="Enter Your Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Message
            </label>
            <textarea
              placeholder="Enter Your Message"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#123499] to-[#2A57DE] hover:from-[#0f2f85] hover:to-[#2247b6] text-white font-bold py-3 px-4 rounded-lg transition-all"
          >
            Contact Us
          </button>
        </form>
      </div>
    </div>
  );
}
