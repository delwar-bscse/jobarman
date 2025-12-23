"use client";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { myFetch } from "../../../../utils/myFetch";
import { getUserRole } from "../../../../utils/getUserRole";

export default function AutoApply() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  console.log("role", isLoggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const profile = await myFetch("/user/profile");
        const role = await getUserRole();
        setIsLoggedIn(role); // true if profile exists
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAutoApply = () => {
    if (!isLoggedIn) {
      toast.error("Please login to continue");
      return;
    }

    router.push("/auto-apply");
  };

  return (
    <button
      onClick={handleAutoApply}
      disabled={loading}
      className="px-6 w-2/3 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white rounded-lg hover:opacity-90 transition font-medium flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50"
    >
      Start Auto Apply <ArrowRight className="w-4 h-4" />
    </button>
  );
}
