"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SidebarProfile from "@/components/jobSeeker/profile/Sidebar";
import { toast } from "sonner";
import { myFetch } from "../../../../../../utils/myFetch";

export default function DeleteAccountPage() {
  const router = useRouter();

  // NEW STATES
  const [showInput, setShowInput] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  console.log();

  // Step 1 → User clicks "Yes"
  const handleYesClick = () => {
    setShowInput(true);
  };

  // Step 2 → Validate & delete
  const handleFinalDelete = async () => {
    console.log(confirmTextsdf, "pass");
    try {
      const res = await myFetch("/user/delete-account", {
        method: "DELETE",
        body: { password: confirmText },
      });

      console.log("res", res);

      if (res.success) {
        toast.success("Delete Account successfully");
      } else {
        toast.error(res.message || "Delete Account  failed");
      }
    } catch (err) {
      console.error(err.message || "Delete Account  failed");
    }
  };

  return (
    <div className="w-full bg-[#FBFBFB]">
      <div className="flex min-h-screen max-w-7xl mx-auto py-10">
        {/* Sidebar */}
        <div className="w-72 bg-white rounded-xl p-6 flex flex-col">
          <SidebarProfile />
        </div>

        {/* Main Content */}

        <div className="flex-1 ml-8 flex items-center justify-center">
          <div className="">
            <h1
              onClick={() => setShowInput(false)}
              className="mb-3 cursor-pointer"
            >
              Back
            </h1>
            <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md w-full">
              {!showInput ? (
                <>
                  {/* Step 1 – Yes/No */}
                  <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                    Are you sure you want to Delete Account?
                  </h2>

                  <div className="flex gap-4">
                    <button
                      onClick={() => router.back()}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg"
                    >
                      No
                    </button>

                    <button
                      onClick={handleYesClick}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg"
                    >
                      Yes
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Step 2 – Show Input */}
                  <h2 className="text-xl font-bold text-center text-red-600 mb-6">
                    Type Your Password
                  </h2>

                  <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="delete my account"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6"
                    required
                  />

                  <button
                    onClick={handleFinalDelete}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg"
                  >
                    Permanently Delete Account
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
