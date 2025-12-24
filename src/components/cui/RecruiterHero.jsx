import Image from "next/image";
import React from "react";

export default function RecruiterHero() {
  return (
    <section className="">
      <div className="relative">
        <Image
          src="/RecruiterHeroImg.png"
          alt="Banner"
          width={1200}
          height={20}
          className="w-full h-[calc(100vh-90px)] object-cover"
        />
        <div className="absolute top-0 bg-blue-500 w-full h-full bg-opacity-70 flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl sm:text-5xl font-bold text-white w-full max-w-[800px] text-center">
            Find Your Perfect Match in Talent & Opportunity
          </h1>
          <p className="text-xl sm:text-2xl text-white w-full max-w-[780px] text-center">
            Connect with the right candidates faster through AI-driven
            recruitment tools.
          </p>
        </div>
      </div>
    </section>
  );
}
