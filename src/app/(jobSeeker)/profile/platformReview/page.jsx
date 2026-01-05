"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";
import { myFetch } from "../../../../../utils/myFetch";

export default function PlatformReviewPage() {
  const [rating, setRating] = useState();
  const [review, setReview] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = async () => {
    if (!review.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Please enter a review",
        text: "Review text cannot be empty",
        confirmButtonColor: "#123499",
      });
      return;
    }
    if (rating <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Please enter your rating",
        text: "Rating cannot be empty",
        confirmButtonColor: "#123499",
      });
      return;
    }

    const res = await myFetch("/review", {
      method: "POST",
      body: { rating, comment: review },
    });

    if (res?.success) {
      Swal.fire({
        icon: "success",
        title: "Review Submitted!",
        text: "Thank you for your feedback. Your review has been submitted successfully.",
        confirmButtonColor: "#123499",
      }).then(() => {
        setReview("");
        setRating(0);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Unable to submit your review. Please try again later.",
        confirmButtonColor: "#123499",
      });
    }
  };

  return (
    <div className="flex items-center justify-center" style={{ height: "calc(100vh - 90px)" }}>
      <div className="bg-white rounded-2xl p-4 shadow-lg max-w-md w-full border border-gray-200">
        <div className="flex justify-center mb-6">
          <Image
            src="/authlogo.svg"
            width={250}
            height={250}
            alt="JOBARMAN Logo"
          />
        </div>

        {/* Star Rating */}
        <div className="flex justify-center gap-3 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              onClick={() => setRating(star)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-10 h-10 ${star <= (hoveredStar || rating)
                    ? "fill-[#FF8F27] text-[#FF8F27]"
                    : "text-gray-300"
                  }`}
              />
            </button>
          ))}
        </div>

        {/* Review Text Area */}
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Share your experience with JOBARMAN..."
          className="w-full p-4 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-[#FF8F27] resize-none"
          rows={5}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-[#123499] to-[#2A57DE] hover:from-[#0f2f85] hover:to-[#2247b6] text-white font-bold py-3 px-4 rounded-lg transition-all"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
