"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
const companyImages = ["/company.jpg", "/company.jpg", "/company.jpg"];

export default function BannerHero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? companyImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === companyImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative w-ful h-40 sm:h-56 md:h-64 lg:h-80  mb-6 rounded-lg overflow-hidden">
      <Image
        src={companyImages[currentImageIndex]}
        alt="Company Office"
        width={1000}
        height={256}
        className="w-full h-full object-cover"
      />
      <button
        onClick={previousImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

{
  /* <div className="relative w-full h-40 sm:h-56 md:h-64 lg:h-80 rounded-lg overflow-hidden">
      <Image
        src={companyImages[currentImageIndex]}
        alt="Company Office"
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />

      <button
        onClick={previousImage}
        className="absolute left-2 top-1/2 -translate-y-1/2
               w-8 h-8 sm:w-10 sm:h-10
               bg-white rounded-full flex items-center justify-center shadow"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 -translate-y-1/2
               w-8 h-8 sm:w-10 sm:h-10
               bg-white rounded-full flex items-center justify-center shadow"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div> */
}
