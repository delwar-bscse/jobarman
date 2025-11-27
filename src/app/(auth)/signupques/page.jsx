"use client";

import Link from "next/link";
import Image from "next/image";

export default function signUpQuesPage() {

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center p-4">
      {/* Back Button */}
      <Link href="/login" className="absolute top-10 left-20 text-gray-600 hover:text-gray-900 transition">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </Link>

      {/* Main Container */}
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
          
          {/* Left Side - Logo Section */}
          <div className="hidden md:flex flex-col items-center justify-center p-8">
            <Image 
              src="/authlogo.svg" 
              alt="Jobarman Logo"
              width={425}
              height={585}
              className="mb-6"
            />
          </div>

          {/* Right Side - Login Form */}
          <div className="flex flex-col justify-center p-8 text-center md:text-left border-2 border-[#ACBDF0] rounded-lg">
            <h2 className="text-4xl text-[#123499] font-semibold text-center mb-5">Are You a Job Seeker or a Recruiter?</h2>
            <p className="text-center font-medium text-[#2F2F2F]">Get started by choosing your role.</p>
             
             <Link href="/register?type=EMPLOYEE">
                <div className="flex justify-center gap-8 mt-5 bg-[#FEF3E6] border-2 border-[#FCB676] p-6 rounded-xl items-center">
                <Image src="/girlanim.svg" alt="Girl Animation" width={80} height={80} />
                <div className="space-y-2">
                    <h2 className="text-[#FF8F27] text-xl font-semibold">Job Seekers</h2>
                    <p className="font-medium">Finding a job here never been easier than before</p>
                </div>
             </div>
             </Link>
             <Link href="/register?type=RECRUITER">
                <div className="flex justify-center gap-8 mt-5 bg-[#FFFFFF] p-6 rounded-xl items-center">
                <Image src="/boyanim.svg" alt="Boy Animation" width={80} height={80} />
                <div className="space-y-2">
                    <h2 className="text-[#147FC7] text-xl font-semibold">Recruiter</h2>
                    <p className="font-medium">Let’s recruit your great candidate faster here </p>
                </div>
             </div>
             </Link>

             
          </div>
        </div>
      </div>
    </div>
  );
}