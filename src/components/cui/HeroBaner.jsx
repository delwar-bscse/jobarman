"use client";

import { useRouter } from "next/navigation";

const { ChevronLeft } = require("lucide-react");
const { default: Image } = require("next/image");

const HeroBanner = () => {
  const router = useRouter();
  return (
    <div className="relative">
      <Image
        src="/alljobs.png"
        alt="Job banner"
        width={1440}
        height={400}
        priority
        className="w-full h-56 sm:h-72 md:h-80 lg:h-96 object-cover"
      />
      <div className="absolute top-4 left-4">
        <button
        onClick={()=>router.back()}
          className="inline-flex items-center rounded-full bg-white/90 text-gray-900 px-3 py-1.5 shadow hover:bg-white"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;