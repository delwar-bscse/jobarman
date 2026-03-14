"use client";

import { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { myFetch } from "../../../../../utils/myFetch";
import RatingComponent from "./RatingComponent";

export default function PlatformReviewPage() {
  const [rating, setRating] = useState();
  const [review, setReview] = useState("");

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
    const payload = { rating, comment: review };
    console.log("Review : ", payload)
    
    const res = await myFetch("/review", {
      method: "POST",
      body: payload,
    });
    console.log("Review res: ", res)

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

  const handleValue = (value) => {
    setRating(value);
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
          <RatingComponent initialValue={0} handleValue={handleValue} size={12}/>
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
