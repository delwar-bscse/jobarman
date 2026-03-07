"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { use } from "react";


export default function LinkedInLogin() {
  const searchParams = useSearchParams();
  const role = searchParams.get("type");
  
  let LINKEDIN_SIGN_IN_URL = "https://api.jobarman.com/api/v1/auth/linkedin-sign-in";

  if(role){
    LINKEDIN_SIGN_IN_URL = `https://api.jobarman.com/api/v1/auth/linkedin-sign-in?role=${role}`;
  }


  const handleLinkedInLogin = () => {
    window.location.href = LINKEDIN_SIGN_IN_URL;
  };

  return (
    <button
      onClick={handleLinkedInLogin}
      type="button"
      className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 py-3 rounded-xl transition hover:bg-gray-50"
    >
      <Image
        src="/linkedin.svg"
        alt="LinkedIn"
        width={36}
        height={36}
      />
    </button>
  );
}
